const curiosidadeTexto = document.getElementById('fatoCurioso');
const botaoNovaCuriosidade = document.getElementById('novaCuriosidade');

async function carregarCuriosidade() {
    try {
        const resposta = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const dado = await resposta.json();
        curiosidadeTexto.textContent = dado.text;
    } catch (erro) {
        curiosidadeTexto.textContent = 'Erro ao carregar curiosidade. Tente novamente.';
        console.error('Erro na API de curiosidades:', erro);
    }
}

// Carrega uma curiosidade ao abrir a página
carregarCuriosidade();

// Carrega nova curiosidade ao clicar no botão
botaoNovaCuriosidade.addEventListener('click', carregarCuriosidade);
