const API_URL = 'http://localhost:8080/api/processos';

export const ProcessoService = {
    
    // Buscar todos os processos (GET)
    listarTodos: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar processos:', error);
            throw error;
        }
    },

    // Salvar um novo processo (POST)
    salvar: async (processo) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Avisa o Spring Boot que estamos enviando JSON
                },
                body: JSON.stringify(processo) // Converte o objeto do React para texto JSON
            });
            
            if (!response.ok) throw new Error(`Erro ao salvar: ${response.status}`);
            
            // Como o seu backend retorna 'void', não precisamos fazer 'response.json()' aqui.
            return true; 
        } catch (error) {
            console.error('Erro ao salvar processo:', error);
            throw error;
        }
    }
};