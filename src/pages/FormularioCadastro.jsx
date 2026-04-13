import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

export default function FormularioCadastro() {
  const navigate = useNavigate();
  const toast = useRef(null);

  // Estado que guarda as informações do formulário
  const [formData, setFormData] = useState({
    cliente: '',
    email: '',
    telefone: '',
    cpf: '',
    cidade: '',
    estado: '',
    tipo_processo: '',
    descricao: '',
    canal_contato: ''
  });

  // Opções para os menus suspensos (Dropdowns)
  const opcoesProcesso = [
    { label: 'Gestão Patrimonial e Sucessões (Inventário)', value: 'SUCESSAO' },
    { label: 'Direito Digital e Proteção de Dados (LGPD/Fraudes)', value: 'DIGITAL' },
    { label: 'Recuperação de Ativos e Cobrança', value: 'RECUPERACAO' },
    { label: 'Outro Assunto', value: 'OUTROS' }
  ];

  const opcoesContato = [
    { label: 'WhatsApp', value: 'WHATSAPP' },
    { label: 'E-mail', value: 'EMAIL' },
    { label: 'Ligação Telefônica', value: 'LIGACAO' }
  ];

  const estadosBrasil = [
    { label: 'Distrito Federal (DF)', value: 'DF' },
    { label: 'Goiás (GO)', value: 'GO' },
    { label: 'São Paulo (SP)', value: 'SP' },
    { label: 'Minas Gerais (MG)', value: 'MG' },
    { label: 'Rio de Janeiro (RJ)', value: 'RJ' },
    { label: 'Outro Estado', value: 'OUTRO' }
  ];

  // Atualiza o estado quando o cliente digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia os dados para o seu Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.cliente || !formData.telefone) {
      toast.current.show({ severity: 'warn', summary: 'Atenção', detail: 'Nome e Telefone são obrigatórios.', life: 3000 });
      return;
    }

    try {
      // Aqui o seu front-end conversa com o seu back-end Spring Boot
      const response = await fetch('http://localhost:8080/api/processos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.current.show({ severity: 'success', summary: 'Enviado!', detail: 'Sua solicitação foi recebida. Entraremos em contato em breve.', life: 4000 });
        
        // Limpa o formulário após o sucesso
        setFormData({ cliente: '', email: '', telefone: '', cpf: '', cidade: '', estado: '', tipo_processo: '', descricao: '', canal_contato: '' });
      } else {
        throw new Error('Erro ao salvar');
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Erro de Conexão', detail: 'Não foi possível enviar os dados no momento.', life: 4000 });
    }
  };

  return (
    <div className="home-container">
      <Toast ref={toast} />

      {/* HEADER SIMPLIFICADO */}
      <header className="header-premium">
        <div className="logo-container" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <h1 className="logo-nome">LUIZ CÂMBER</h1>
          <span className="logo-especialidade">ADVOCACIA E INTELIGÊNCIA JURÍDICA</span>
        </div>
      </header>

      {/* ÁREA DO FORMULÁRIO */}
      <section className="form-section">
        <div className="form-card">
          <h2 className="form-titulo">Análise de Viabilidade</h2>
          <p className="form-subtitulo">Preencha os dados abaixo com segurança. As informações são protegidas pelo sigilo profissional.</p>

          <form onSubmit={handleSubmit} className="p-fluid form-grid">
            
            <div className="form-field full-width">
              <label>Nome Completo *</label>
              <InputText name="cliente" value={formData.cliente} onChange={handleChange} placeholder="Ex: João da Silva" required />
            </div>

            <div className="form-field half-width">
              <label>CPF</label>
              <InputMask name="cpf" value={formData.cpf} onChange={handleChange} mask="999.999.999-99" placeholder="000.000.000-00" />
            </div>

            <div className="form-field half-width">
              <label>E-mail *</label>
              <InputText name="email" value={formData.email} onChange={handleChange} type="email" placeholder="seuemail@exemplo.com" required />
            </div>

            <div className="form-field half-width">
              <label>Telefone / WhatsApp *</label>
              <InputMask name="telefone" value={formData.telefone} onChange={handleChange} mask="(99) 99999-9999" placeholder="(00) 00000-0000" required />
            </div>

            <div className="form-field half-width">
              <label>Canal de Contato Preferido</label>
              <Dropdown name="canal_contato" value={formData.canal_contato} options={opcoesContato} onChange={handleChange} placeholder="Selecione" />
            </div>

            <div className="form-field half-width">
              <label>Cidade</label>
              <InputText name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Ex: Brasília" />
            </div>

            <div className="form-field half-width">
              <label>Estado</label>
              <Dropdown name="estado" value={formData.estado} options={estadosBrasil} onChange={handleChange} placeholder="Selecione" />
            </div>

            <div className="form-field full-width">
              <label>Qual a área de interesse?</label>
              <Dropdown name="tipo_processo" value={formData.tipo_processo} options={opcoesProcesso} onChange={handleChange} placeholder="Selecione o assunto principal" />
            </div>

            <div className="form-field full-width">
              <label>Breve relato do caso</label>
              <InputTextarea name="descricao" value={formData.descricao} onChange={handleChange} rows={4} placeholder="Descreva brevemente a situação para que possamos fazer uma análise prévia..." />
            </div>

            <div className="form-field full-width form-actions">
              <Button type="button" label="Voltar" icon="pi pi-arrow-left" className="p-button-text p-button-secondary" onClick={() => navigate('/')} />
              <Button type="submit" label="Enviar Solicitação Segura" icon="pi pi-lock" className="btn-dourado" />
            </div>

          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-premium" style={{ marginTop: '0' }}>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Luiz Câmber Amaro - OAB/DF 87.579. Dados protegidos pela LGPD.</p>
      </footer>
    </div>
  );
}