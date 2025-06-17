let dataAtual = new Date();

document.addEventListener("DOMContentLoaded", () => {
  renderizarCalendario(dataAtual);

  document.getElementById("mesAnterior").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    renderizarCalendario(dataAtual);
  });

  document.getElementById("mesProximo").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    renderizarCalendario(dataAtual);
  });
});

async function renderizarCalendario(data) {
  const diasContainer = document.getElementById("diasCalendario");
  const titulo = document.getElementById("mesAno");
  const ano = data.getFullYear();
  const mes = data.getMonth(); // Janeiro = 0

  const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                     "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  titulo.textContent = `${nomeMeses[mes]} ${ano}`;

  diasContainer.innerHTML = "";

  // Busca feriados do ano atual
  let feriados = [];
  try {
    const res = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
    const data = await res.json();
    feriados = data.map(f => f.date); // ["2025-01-01", ...]
  } catch (e) {
    console.error("Erro ao buscar feriados:", e);
  }

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  // Preenche espaços antes do dia 1
  for (let i = 0; i < primeiroDia; i++) {
    diasContainer.innerHTML += `<span></span>`;
  }

  // Preenche dias do mês
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const isFeriado = feriados.includes(dataFormatada);
    diasContainer.innerHTML += `<span class="${isFeriado ? 'feriado' : ''}">${dia}</span>`;
  }
}
