import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';

export default function Login() {
  const [credenciais, setCredenciais] = useState({ login: '', senha: '' });
  const [carregando, setCarregando] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault(); // Evita que a página recarregue
    setCarregando(true);

    try {
      // 1. Monta a URL usando a variável de ambiente
      const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/login`;

      // 2. Faz a requisição usando o fetch
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciais)
      });

      if (response.ok) {
        // Se o Java retornou 200 OK, o login deu certo!
        localStorage.setItem('usuarioLogado', 'true');
        
        // Redireciona para o painel Admin
        navigate('/admin');
      } else {
        // Se retornou 401, a senha está errada
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Usuário ou senha incorretos.' });
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao conectar com o servidor.' });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Toast ref={toast} />

      <Card style={{ width: '100%', maxWidth: '400px', padding: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <i className="pi pi-user" style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}></i>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Acesso Administrativo</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Insira suas credenciais para continuar</p>
        </div>

        <form onSubmit={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <span className="p-float-label">
            <InputText 
              id="login" 
              value={credenciais.login} 
              onChange={(e) => setCredenciais({...credenciais, login: e.target.value})} 
              style={{ width: '100%' }} 
              required
            />
            <label htmlFor="login">Usuário</label>
          </span>

          <span className="p-float-label">
            <Password 
              id="senha" 
              value={credenciais.senha} 
              onChange={(e) => setCredenciais({...credenciais, senha: e.target.value})} 
              style={{ width: '100%' }} 
              inputStyle={{ width: '100%' }}
              feedback={false} // Tira a barra de força da senha (já que é só login)
              toggleMask // Coloca o ícone de olhinho para ver a senha
              required
            />
            <label htmlFor="senha">Senha</label>
          </span>

          <Button 
            type="submit" 
            label={carregando ? "Autenticando..." : "Entrar"} 
            icon={carregando ? "pi pi-spin pi-spinner" : "pi pi-sign-in"} 
            disabled={carregando}
            style={{ marginTop: '1rem' }} 
          />

          <Button 
            type="button" 
            label="Voltar para o site" 
            className="p-button-text p-button-secondary" 
            onClick={() => navigate('/')} 
          />
        </form>
      </Card>
    </div>
  );
}