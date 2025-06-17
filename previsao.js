document.addEventListener('DOMContentLoaded', () => {
    // Garante que o código só rode se o widget de clima existir
    const weatherWidget = document.getElementById('weather-widget');
    if (!weatherWidget) return;

    // --- SELEÇÃO CORRETA DOS ELEMENTOS PARA O MENU DE OPÇÕES ---
    const citySelect = weatherWidget.querySelector('#city-select'); // O menu de seleção
    const weatherDisplay = weatherWidget.querySelector('#weather-display');
    const weatherMessage = weatherWidget.querySelector('#weather-message');

    const cityNameEl = weatherWidget.querySelector('#city-name');
    const weatherIconEl = weatherWidget.querySelector('#weather-icon');
    const temperatureEl = weatherWidget.querySelector('#temperature');
    const descriptionEl = weatherWidget.querySelector('#description');
    const humidityEl = weatherWidget.querySelector('#humidity');
    const windEl = weatherWidget.querySelector('#wind');
    
    // A sua chave da API do OpenWeatherMap
    const apiKey = '945a24425c264570294ed152f17c7687';

    // Função para buscar os dados na API (não muda)
    const getWeatherData = async (city) => {
        weatherDisplay.classList.add('hidden');
        weatherMessage.classList.remove('hidden');
        weatherMessage.classList.remove('error');
        weatherMessage.innerHTML = `<p>Buscando dados para ${city.replace(/([A-Z])/g, ' $1').trim()}...</p>`; // Adiciona espaço antes de letra maiúscula para nomes como "Sao Paulo"

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            updateUI(data);

        } catch (error) {
            showError(`Erro ao buscar dados para esta cidade.`);
            console.error('Erro:', error);
        }
    };

    // Função para atualizar a interface (não muda)
    const updateUI = (data) => {
        cityNameEl.textContent = data.name;
        temperatureEl.textContent = Math.round(data.main.temp);
        descriptionEl.textContent = data.weather[0].description;
        humidityEl.textContent = `${data.main.humidity}%`;
        windEl.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        const iconCode = data.weather[0].icon;
        weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIconEl.alt = data.weather[0].description;
        weatherMessage.classList.add('hidden');
        weatherDisplay.classList.remove('hidden');
    };

    // Função para mostrar mensagens de erro (não muda)
    const showError = (message) => {
        weatherDisplay.classList.add('hidden');
        weatherMessage.classList.remove('hidden');
        weatherMessage.classList.add('error');
        weatherMessage.innerHTML = `<p>${message}</p>`;
    };

    // --- A LÓGICA PRINCIPAL CORRIGIDA ---
    // Em vez de ouvir um 'submit', vamos ouvir o evento 'change' no menu de seleção.
    citySelect.addEventListener('change', () => {
        const selectedCity = citySelect.value;
        
        // Se o valor selecionado não for vazio, busca os dados.
        if (selectedCity) {
            getWeatherData(selectedCity);
        } else {
            // Se o usuário selecionar a opção "Selecione...", esconde tudo.
            weatherDisplay.classList.add('hidden');
            weatherMessage.classList.add('hidden');
        }
    });
});