
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const body = document.body;

    // 1. DEFINIÇÕES DOS TEMAS E ÍCONES
    const themes = ['light', 'dark', 'forest', 'pastel'];
    const icons = {
        light: 'img/sun.png',
        dark: 'img/moon.png',
        forest: 'img/forest.png',
        pastel: 'img/palette.png' 
    };

    let currentThemeIndex = 0;

    // 2. FUNÇÃO PARA APLICAR O TEMA
    const applyTheme = (themeName) => {
        themes.forEach(t => body.classList.remove(`theme-${t}`));
        
        if (themeName !== 'light') {
            body.classList.add(`theme-${themeName}`);
        }
        
        themeSwitcher.innerHTML = icons[themeName];
        
        localStorage.setItem('selectedTheme', themeName);

        currentThemeIndex = themes.indexOf(themeName);
    };

    // 3. CARREGAR TEMA SALVO NA INICIALIZAÇÃO
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && themes.includes(savedTheme)) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light');
    }

    // 4. EVENTO DE CLIQUE NO BOTÃO
    themeSwitcher.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[currentThemeIndex];
        applyTheme(nextTheme);
    });
});