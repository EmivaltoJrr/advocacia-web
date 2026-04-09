import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate(); // Ferramenta do React para trocar de página sem recarregar

  // Função para abrir o WhatsApp
  const abrirWhatsApp = () => {
    const numero = "5511999999999"; // Substitua pelo número real do escritório
    const msg = "Olá, gostaria de agendar uma consultoria jurídica.";
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* 1. BARRA DE NAVEGAÇÃO (Topo) */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 2rem', 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ margin: 0, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="pi pi-briefcase" style={{ fontSize: '1.5rem', color: '#3b82f6' }}></i>
          Luiz Claudio Advocacia
        </h2>
        
        {/* Botão de Login no Canto Superior Direito */}
        <Button 
          label="Acesso Restrito" 
          icon="pi pi-lock" 
          className="p-button-text p-button-secondary" 
          onClick={() => navigate('/login')} 
        />
      </header>

      {/* 2. DESTAQUE PRINCIPAL (Hero Section) */}
      <section style={{ textAlign: 'center', padding: '5rem 1rem', backgroundColor: '#1e293b', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>Defesa Técnica, Ética e Eficiente</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2rem auto', color: '#cbd5e1', lineHeight: '1.6' }}>
          Protegendo seus direitos com estratégia e transparência. 
          Especialistas em resolução de conflitos e acompanhamento completo de processos do início ao fim.
        </p>
        <Button 
          label="Fale com um Especialista" 
          icon="pi pi-whatsapp" 
          severity="success" 
          size="large" 
          onClick={abrirWhatsApp} 
        />
      </section>

      {/* 3. COMO ESTRUTURAMOS SEU CASO (Cards informativos) */}
      <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', color: '#334155', marginBottom: '3rem', fontSize: '2rem' }}>
          Como Trabalhamos o Seu Caso
        </h2>
        
        {/* Grid para deixar os cards lado a lado no PC e um embaixo do outro no Celular */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <Card style={{ textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <i className="pi pi-comments" style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#1e293b', marginTop: 0 }}>1. Consultoria Inicial</h3>
            <p style={{ color: '#64748b', lineHeight: '1.5' }}>
              Reunião sigilosa para entender os detalhes do seu problema e traçar os primeiros cenários possíveis.
            </p>
          </Card>

          <Card style={{ textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <i className="pi pi-search" style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#1e293b', marginTop: 0 }}>2. Análise Técnica</h3>
            <p style={{ color: '#64748b', lineHeight: '1.5' }}>
              Nossa equipe estuda a jurisprudência, analisa contratos e reúne as provas necessárias para o caso.
            </p>
          </Card>

          <Card style={{ textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <i className="pi pi-file" style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#1e293b', marginTop: 0 }}>3. Ação ou Acordo</h3>
            <p style={{ color: '#64748b', lineHeight: '1.5' }}>
              Elaboramos a petição com máxima agilidade técnica, priorizando sempre a solução mais rápida.
            </p>
          </Card>

          <Card style={{ textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <i className="pi pi-sync" style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#1e293b', marginTop: 0 }}>4. Acompanhamento</h3>
            <p style={{ color: '#64748b', lineHeight: '1.5' }}>
              Monitoramento constante. Você é avisado sobre cada movimentação processual de forma clara e objetiva.
            </p>
          </Card>

        </div>
      </section>

      {/* 4. RODAPÉ BÁSICO */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', textAlign: 'center', padding: '2rem', marginTop: '4rem' }}>
        <p>&copy; {new Date().getFullYear()} Luiz Claudio Advocacia. Todos os direitos reservados.</p>
        <p style={{ fontSize: '0.9rem' }}>OAB/DF 123.456</p>
      </footer>

    </div>
  );
}