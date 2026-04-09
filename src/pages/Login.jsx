export default function Login() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h2>Login Administrativo</h2>
      <p>Aqui colocaremos o formulário de senha em breve.</p>
      <button onClick={() => window.location.href='/admin'}>Entrar no Painel (Teste)</button>
    </div>
  );
}