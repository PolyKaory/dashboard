const eventoForm = document.getElementById('evento-form');
const nomeInput = document.getElementById('evento-nome');
const dataInput = document.getElementById('evento-data');
const listaEventos = document.getElementById('lista-eventos');

let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

function salvarEventos() {
  localStorage.setItem('eventos', JSON.stringify(eventos));
}

function calcularDiasRestantes(dataEvento) {
  const hoje = new Date();
  const eventoData = new Date(dataEvento + 'T00:00:00');
  const diff = Math.ceil((eventoData - hoje) / (1000 * 60 * 60 * 24));
  return diff;
}

function renderizarEventos() {
  listaEventos.innerHTML = '';

  eventos.forEach((evento, index) => {
    const li = document.createElement('li');
    const diasRestantes = calcularDiasRestantes(evento.data);

    li.textContent = `${evento.nome} - ${diasRestantes > 0 ? `${diasRestantes} dia(s) restantes` : diasRestantes === 0 ? 'Hoje!' : 'Evento passado'}`;

    // Botão de deletar (opcional)
    const btnDel = document.createElement('button');
    btnDel.textContent = '×';
    btnDel.style.background = 'none';
    btnDel.style.border = 'none';
    btnDel.style.color = 'red';
    btnDel.style.fontSize = '1.2rem';
    btnDel.style.cursor = 'pointer';
    btnDel.onclick = () => {
      eventos.splice(index, 1);
      salvarEventos();
      renderizarEventos();
    };

    li.appendChild(btnDel);
    listaEventos.appendChild(li);
  });
}

eventoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = nomeInput.value.trim();
  const data = dataInput.value;

  if (nome && data) {
    eventos.push({ nome, data });
    salvarEventos();
    renderizarEventos();
    eventoForm.reset();
  }
});

renderizarEventos();
