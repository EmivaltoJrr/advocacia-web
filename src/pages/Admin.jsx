import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import { ProcessoService } from '../services/ProcessoService';

export default function Admin() {
  const [processos, setProcessos] = useState([]);
  
  // --- Estados do Formulário ---
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoProcesso, setNovoProcesso] = useState({
    numeroProcesso: '',
    cliente: '',
    descricao: ''
  });

  const toast = useRef(null); // Para mostrar as mensagens de sucesso/erro

  // --- Carregar Dados ---
  const carregarProcessos = async () => {
    try {
      const data = await ProcessoService.listarTodos();
      setProcessos(data);
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os dados.' });
    }
  };

  useEffect(() => {
    carregarProcessos();
  }, []);

  // --- Salvar Dados ---
  const salvarProcesso = async () => {
    // Validação simples baseada no seu @NotBlank do Java
    if (!novoProcesso.numeroProcesso || !novoProcesso.cliente) {
      toast.current?.show({ severity: 'warn', summary: 'Atenção', detail: 'Número do Processo e Cliente são obrigatórios!' });
      return;
    }

    try {
      await ProcessoService.salvar(novoProcesso);
      
      toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Processo cadastrado com sucesso!' });
      
      setModalVisivel(false); // Fecha o modal
      setNovoProcesso({ numeroProcesso: '', cliente: '', descricao: '' }); // Limpa o formulário
      carregarProcessos(); // Recarrega a tabela imediatamente
      
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar no servidor.' });
    }
  };

  // --- Formatação visual ---
  const formatarData = (rowData) => {
    if (!rowData.dataAbertura) return 'N/A';
    return new Date(rowData.dataAbertura).toLocaleDateString('pt-BR');
  };

  // Botões do rodapé do Modal
  const footerModal = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={() => setModalVisivel(false)} className="p-button-text" />
      <Button label="Salvar Processo" icon="pi pi-check" onClick={salvarProcesso} autoFocus />
    </div>
  );

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Componente invisível para exibir as notificações */}
      <Toast ref={toast} />

      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#334155', margin: 0 }}>Painel Administrativo</h2>
        <div>
          <Button label="Novo Processo" icon="pi pi-plus" severity="success" onClick={() => setModalVisivel(true)} style={{ marginRight: '10px' }} />
          <Button label="Sair" icon="pi pi-sign-out" severity="danger" onClick={() => window.location.href='/'} />
        </div>
      </div>

      {/* Tabela */}
      <div className="card" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <DataTable value={processos} stripedRows paginator rows={10} emptyMessage="Nenhum processo encontrado.">
          <Column field="id" header="ID" sortable style={{ width: '10%' }}></Column>
          <Column field="numeroProcesso" header="Nº Processo" sortable style={{ width: '25%' }}></Column>
          <Column field="cliente" header="Cliente" sortable style={{ width: '25%' }}></Column>
          <Column field="descricao" header="Ação" style={{ width: '25%' }}></Column>
          <Column header="Abertura" body={formatarData} sortable style={{ width: '15%' }}></Column>
        </DataTable>
      </div>

      {/* Modal de Cadastro */}
      <Dialog header="Cadastrar Novo Processo" visible={modalVisivel} style={{ width: '50vw' }} onHide={() => setModalVisivel(false)} footer={footerModal}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
          
          <span className="p-float-label">
            <InputText id="numeroProcesso" value={novoProcesso.numeroProcesso} onChange={(e) => setNovoProcesso({...novoProcesso, numeroProcesso: e.target.value})} style={{ width: '100%' }} />
            <label htmlFor="numeroProcesso">Número do Processo *</label>
          </span>

          <span className="p-float-label">
            <InputText id="cliente" value={novoProcesso.cliente} onChange={(e) => setNovoProcesso({...novoProcesso, cliente: e.target.value})} style={{ width: '100%' }} />
            <label htmlFor="cliente">Nome do Cliente *</label>
          </span>

          <span className="p-float-label">
            <InputTextarea id="descricao" value={novoProcesso.descricao} onChange={(e) => setNovoProcesso({...novoProcesso, descricao: e.target.value})} rows={4} style={{ width: '100%' }} />
            <label htmlFor="descricao">Descrição / Ação</label>
          </span>
          
        </div>
      </Dialog>

    </div>
  );
}