const canvas = document.getElementById('quadroDeDesenho');
const ctx = canvas.getContext('2d');
const seletorDeCor = document.getElementById('seletorDeCor');
const btnLimpar = document.getElementById('btnLimpar');
const btnBaixar = document.getElementById('btnBaixar');

// --- FUNÇÃO PARA REDIMENSIONAR O CANVAS ---
function resizeCanvas() {
    // Obtém o tamanho real que o canvas está ocupando na tela (definido pelo CSS)
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Se o tamanho da superfície de desenho for diferente, atualiza
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
    }
}

// =======================================================
// --- MUDANÇA PRINCIPAL ESTÁ AQUI ---
// =======================================================
// Usamos setTimeout para garantir que o CSS seja aplicado antes de redimensionar
window.addEventListener('load', () => {
    setTimeout(resizeCanvas, 0); 
});

window.addEventListener('resize', () => {
    setTimeout(resizeCanvas, 0);
});
// =======================================================
// --- FIM DA MUDANÇA ---
// =======================================================


// --- ESTADO INICIAL ---
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// --- FUNÇÃO DE DESENHO ---
function draw(e) {
    if (!isDrawing) return;

    ctx.strokeStyle = seletorDeCor.value; 
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// --- EVENT LISTENERS (OUVINTES DE EVENTO) ---

// Eventos do Mouse no Canvas
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Evento para Limpar o Canvas
btnLimpar.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Evento para Baixar o Desenho
btnBaixar.addEventListener('click', () => {
    const link = document.createElement('a'); 
    link.download = 'meu-desenho.png';
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    link.href = canvas.toDataURL('image/png');
    ctx.restore();
    link.click();
});