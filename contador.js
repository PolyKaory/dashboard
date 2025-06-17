// --- SELEÇÃO DOS ELEMENTOS DO DOM ---
const eventNameInput = document.getElementById('event-name');
const eventDateInput = document.getElementById('event-date');
const countdownResultElement = document.getElementById('countdown-result');

// --- CONSTANTES ---
const MS_PER_DAY = 1000 * 60 * 60 * 24; // Milissegundos em um dia

// --- FUNÇÃO PARA CALCULAR E EXIBIR A CONTAGEM ---
function calculateCountdown() {
  const eventName = eventNameInput.value.trim();
  const eventDateString = eventDateInput.value;

  // Se a data ou o nome não estiverem preenchidos, não faz nada
  if (!eventDateString || !eventName) {
    countdownResultElement.innerHTML = `<p>Preencha o nome e a data do evento.</p>`;
    return;
  }

  // Para evitar problemas de fuso horário, tratamos as datas como locais
  const targetDate = new Date(eventDateString + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zera a hora do dia atual para uma comparação justa

  const diffInMillis = targetDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffInMillis / MS_PER_DAY);

  // Monta a mensagem com base nos dias restantes
  let message = '';
  if (daysLeft > 1) {
    message = `Faltam <strong>${daysLeft}</strong> dias para ${eventName}!`;
  } else if (daysLeft === 1) {
    message = `Falta <strong>1</strong> dia para ${eventName}!`;
  } else if (daysLeft === 0) {
    message = `É hoje! Chegou o dia do(a) <strong>${eventName}</strong>! 🎉`;
  } else {
    const daysAgo = Math.abs(daysLeft);
    message = `${eventName} foi há <strong>${daysAgo}</strong> ${daysAgo === 1 ? 'dia' : 'dias'}.`;
  }

  countdownResultElement.innerHTML = message;

  // Salva os dados no localStorage sempre que houver uma alteração válida
  saveData();
}

// --- FUNÇÕES DE PERSISTÊNCIA (localStorage) ---
function saveData() {
  const eventData = {
    name: eventNameInput.value,
    date: eventDateInput.value,
  };
  localStorage.setItem('countdownEvent', JSON.stringify(eventData));
}

function loadData() {
  const savedData = localStorage.getItem('countdownEvent');
  if (savedData) {
    const eventData = JSON.parse(savedData);
    eventNameInput.value = eventData.name;
    eventDateInput.value = eventData.date;

    // Após carregar os dados, chama a função para exibir o resultado
    calculateCountdown();
  }
}

// --- EVENT LISTENERS ---
eventNameInput.addEventListener('input', calculateCountdown);
eventDateInput.addEventListener('input', calculateCountdown);

// --- INICIALIZAÇÃO ---
// Carrega os dados salvos assim que a página é carregada
document.addEventListener('DOMContentLoaded', loadData);