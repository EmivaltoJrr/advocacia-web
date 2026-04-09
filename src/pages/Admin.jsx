export default function Admin() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h2>Painel Administrativo</h2>
      <p>Aqui ficará a tabela (DataTable) conectada ao seu Spring Boot.</p>
      <button onClick={() => window.location.href='/'}>Voltar ao Site</button>
    </div>
  );
}