// --- SELEÇÃO DOS ELEMENTOS DO DOM ---
const hourHand = document.getElementById('hourHand');
const minHand = document.getElementById('minHand');
const secHand = document.getElementById('secHand');
const digitalClock = document.getElementById('digitalClock');
const analogClock = document.querySelector('.analog-clock');
const switchButton = document.getElementById('switchButton');

// --- FUNÇÃO PRINCIPAL DE ATUALIZAÇÃO DO RELÓGIO ---
function setTime() {
    const now = new Date();

    // --- Lógica do Relógio Analógico ---
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90; // +90 de offset pois o CSS começa com 90deg
    secHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    minHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    // --- Lógica do Relógio Digital ---
    // Adiciona um zero à esquerda se o número for menor que 10
    const digitalHours = String(hours).padStart(2, '0');
    const digitalMinutes = String(minutes).padStart(2, '0');
    const digitalSeconds = String(seconds).padStart(2, '0');
    
    digitalClock.textContent = `${digitalHours}:${digitalMinutes}:${digitalSeconds}`;
}

// --- LÓGICA DO BOTÃO DE TROCA ---
switchButton.addEventListener('click', () => {
    // Alterna a classe 'hidden' nos dois relógios
    analogClock.classList.toggle('hidden');
    digitalClock.classList.toggle('hidden');

    // Atualiza o texto do botão
    if (digitalClock.classList.contains('hidden')) {
        switchButton.textContent = 'Ver Relógio Digital';
    } else {
        switchButton.textContent = 'Ver Relógio Analógico';
    }
});


// --- INICIALIZAÇÃO ---
// Chama a função uma vez para não esperar 1 segundo para o relógio aparecer
setTime(); 
// Define um intervalo para atualizar o relógio a cada segundo
setInterval(setTime, 1000);