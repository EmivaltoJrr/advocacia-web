const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/processos`;

export const ProcessoService = {
    
    // Buscar todos os processos (GET)
    listarTodos: async () => {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            
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
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(processo)
            });
            
            if (!response.ok) {
                throw new Error(`Erro ao salvar: ${response.status}`);
            }
            
            // Como o backend Spring retorna 'void', retornamos true para confirmar o sucesso
            return true; 
        } catch (error) {
            console.error('Erro ao salvar processo:', error);
            throw error;
        }
    }
};