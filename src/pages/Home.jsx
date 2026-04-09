import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useState } from 'react';

export default function Home() {
  const [contato, setContato] = useState({ nome: '', telefone: '', mensagem: '' });

  // Função para abrir o WhatsApp do advogado
  const abrirWhatsApp = () => {
    const numero = "5511999999999"; // Substitua pelo número real
    const msg = "Olá, gostaria de uma consultoria jurídica.";
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Função para enviar o formulário (futuramente vai para o seu Spring Boot)
  const enviarContato = (e) => {
    e.preventDefault();
    console.log("Enviando para a API:", contato);
    alert("Mensagem enviada com sucesso! Entraremos em contato.");
    setContato({ nome: '', telefone: '', mensagem: '' });
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* SEÇÃO HERO (Apresentação) */}
      <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Dr. João Silva - Advocacia Especializada</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Defendendo seus direitos com excelência, ética e agilidade. Especialista em Direito Civil e Trabalhista.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button label="Fale no WhatsApp" icon="pi pi-whatsapp" severity="success" onClick={abrirWhatsApp} />
          <Button label="Área do Cliente" icon="pi pi-user" severity="secondary" onClick={() => window.location.href='/login'} />
        </div>
      </header>

      {/* SEÇÃO DE CONTATO (Formulário) */}
      <section style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1rem' }}>
        <h2 style={{ textAlign: 'center', color: '#334155' }}>Deixe sua mensagem</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>
          Preencha o formulário abaixo e nossa equipe retornará rapidamente.
        </p>

        <form onSubmit={enviarContato} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span className="p-float-label">
            <InputText id="nome" value={contato.nome} onChange={(e) => setContato({...contato, nome: e.target.value})} style={{ width: '100%' }} required />
            <label htmlFor="nome">Seu Nome Completo</label>
          </span>

          <span className="p-float-label">
            <InputText id="telefone" value={contato.telefone} onChange={(e) => setContato({...contato, telefone: e.target.value})} style={{ width: '100%' }} required />
            <label htmlFor="telefone">Telefone / WhatsApp</label>
          </span>

          <span className="p-float-label">
            <InputTextarea id="mensagem" value={contato.mensagem} onChange={(e) => setContato({...contato, mensagem: e.target.value})} rows={4} style={{ width: '100%' }} required />
            <label htmlFor="mensagem">Como podemos ajudar?</label>
          </span>

          <Button type="submit" label="Enviar Mensagem" icon="pi pi-send" style={{ width: '100%' }} />
        </form>
      </section>
    </div>
  );
}