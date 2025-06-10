const btnConselho = document.getElementById('btnConselho');
        const pSetup = document.getElementById('setup');
        const pLoading = document.getElementById('loading');
        const pError = document.getElementById('error');


        // Função para buscar um conselho aleatório da API
        async function buscarConselho() {
            pLoading.style.display = 'block';
            pError.textContent = '';
            pSetup.textContent = '';

            try {
                const response = await fetch('https://api.adviceslip.com/advice');
                if (!response.ok) {
                    throw new Error('Erro na resposta da API: ' + response.status);
                }
                const data = await response.json();

                // Exibe o conselho
                pSetup.textContent = data.slip.advice;

            } catch (error) {
                console.error("Falha ao buscar conselho:", error);
                pError.textContent = 'Erro ao buscar conselho. Tente novamente.';
            } finally {
                pLoading.style.display = 'none';
            }
        }

        btnConselho.addEventListener('click', buscarConselho);

