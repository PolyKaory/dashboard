// --- SELEÇÃO DOS ELEMENTOS DO DOM ---
const findMeBtn = document.getElementById('find-me-btn');
const locationDataElement = document.getElementById('location-data');
const mapContainer = document.getElementById('map-container');

// --- FUNÇÃO DE SUCESSO (QUANDO A LOCALIZAÇÃO É OBTIDA) ---
function handleSuccess(position) {
  const { latitude, longitude } = position.coords;

  // Exibe as coordenadas na tela, formatadas com 4 casas decimais
  locationDataElement.innerHTML = `
    <strong>Latitude:</strong> ${latitude.toFixed(4)}<br>
    <strong>Longitude:</strong> ${longitude.toFixed(4)}
  `;

  // Cria a URL para o iframe do Google Maps
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Insere o iframe no container do mapa
  mapContainer.innerHTML = `<iframe src="${mapUrl}"></iframe>`;
  
  // Reativa o botão
  findMeBtn.disabled = false;
  findMeBtn.textContent = "Atualizar Localização";
}

// --- FUNÇÃO DE ERRO (QUANDO ALGO DÁ ERRADO) ---
function handleError(error) {
  let errorMessage;
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = "Você negou a permissão para acessar sua localização.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = "As informações de localização não estão disponíveis.";
      break;
    case error.TIMEOUT:
      errorMessage = "O pedido para obter a localização expirou.";
      break;
    default:
      errorMessage = "Ocorreu um erro desconhecido.";
      break;
  }
  
  locationDataElement.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
  
  // Limpa o mapa e reativa o botão
  mapContainer.innerHTML = '';
  findMeBtn.disabled = false;
  findMeBtn.textContent = "Tentar Novamente";
}

// --- EVENT LISTENER PARA O BOTÃO ---
findMeBtn.addEventListener('click', () => {
  // Verifica se o navegador suporta a API de Geolocalização
  if (!navigator.geolocation) {
    locationDataElement.textContent = 'A Geolocalização não é suportada por este navegador.';
    return;
  }

  // Desativa o botão e mostra uma mensagem de carregamento
  findMeBtn.disabled = true;
  locationDataElement.textContent = 'Buscando sua localização...';
  mapContainer.innerHTML = ''; // Limpa o mapa anterior

  // Chama a API de Geolocalização
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
});