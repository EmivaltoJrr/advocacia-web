import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom'; // Importação adicionada
import './styles.css';

export default function Home() {
  const navigate = useNavigate(); // Ferramenta de navegação ativada

  // Função para abrir o WhatsApp
  const abrirWhatsApp = () => {
    const numero = "556185306262"; // Substitua pelo seu número
    const msg = "Olá. Gostaria de solicitar uma análise de viabilidade jurídica com o Dr. Luiz Câmber.";
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Função para abrir a página do Formulário de Pré-Cadastro
  const abrirFormulario = () => {
    navigate('/cadastro'); 
  };

  return (
    <div className="home-container">
      
      {/* 1. BARRA DE NAVEGAÇÃO (Fixa e Centralizada) */}
      <header className="header-premium">
        <div className="logo-container">
          <h1 className="logo-nome">LUIZ CÂMBER</h1>
          <span className="logo-especialidade">ADVOCACIA E INTELIGÊNCIA JURÍDICA</span>
        </div>
      </header>

      {/* 2. DESTAQUE PRINCIPAL (Hero Section) */}
      <section className="hero-section">
        <h2 className="hero-titulo">
          Análise Estratégica e Rigor Técnico na Proteção do seu Patrimônio
        </h2>
        <p className="hero-texto">
          Unimos a experiência jurídica à precisão da inteligência de dados (BI) para oferecer soluções resolutivas em casos de alta complexidade.
        </p>
        
        {/* Agrupamento dos Botões */}
        <div className="botoes-hero">
          <Button 
            label="Agendar Consultoria Estratégica" 
            icon="pi pi-whatsapp" 
            className="btn-dourado"
            onClick={abrirWhatsApp} 
          />
          
          <Button 
            label="Preencher Formulário de Pré-Cadastro" 
            icon="pi pi-file-edit" 
            className="btn-secundario"
            onClick={abrirFormulario} 
          />
        </div>
      </section>

      {/* 3. ÁREAS DE ATUAÇÃO (Cards) */}
      <section className="areas-section">
        <h3 className="areas-titulo">Áreas de Atuação Especializada</h3>
        
        <div className="areas-grid">
          <Card className="card-premium">
            <i className="pi pi-home card-icone"></i>
            <h4 className="card-titulo">Gestão Patrimonial e Sucessões</h4>
            <p className="card-texto">
              Atuação em Inventários e Planejamento Sucessório com foco na organização e preservação de bens familiares, utilizando métodos analíticos para a partilha de ativos.
            </p>
          </Card>

          <Card className="card-premium">
            <i className="pi pi-shield card-icone"></i>
            <h4 className="card-titulo">Direito Digital e Proteção de Dados</h4>
            <p className="card-texto">
              Consultoria em incidentes com Pix, fraudes em meios de pagamento e adequação à LGPD, garantindo conformidade e segurança institucional.
            </p>
          </Card>

          <Card className="card-premium">
            <i className="pi pi-chart-line card-icone"></i>
            <h4 className="card-titulo">Recuperação de Ativos</h4>
            <p className="card-texto">
              Instrução técnica em execuções, utilizando inteligência de dados e investigação patrimonial para subsidiar pedidos judiciais de constrição de bens.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. RODAPÉ ÉTICO (Padrão OAB) */}
      <footer className="footer-premium">
        <h4 className="footer-nome">LUIZ CÂMBER AMARO</h4>
        <p className="footer-texto">Atendimento presencial em Brasília e Consultoria Digital em todo o território nacional.</p>
        <p className="footer-nota">OAB/DF 87.579</p>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Todos os direitos reservados. Site em conformidade com o Provimento 205/2021 da OAB.</p>
      </footer>

    </div>
  );
}