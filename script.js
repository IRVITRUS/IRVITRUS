// ==========================================
// LÓGICA DEL MENÚ DE ASTERISCOS
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const dropdown = document.getElementById('dropdown');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuBtn.classList.toggle('rotar');
    dropdown.classList.toggle('mostrar');
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && dropdown.classList.contains('mostrar')) {
        menuBtn.classList.remove('rotar');
        dropdown.classList.remove('mostrar');
    }
});

// ==========================================
// LÓGICA DE LA MÚSICA CON WAVESURFER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Configuración visual de las ondas
    const waveOptions = {
        waveColor: '#555555',      // Gris oscuro para la parte que no ha sonado
        progressColor: '#ffffff',  // Blanco puro para la parte que ya sonó
        barWidth: 2,               // Grosor de cada rayita
        barRadius: 2,              // Puntas redondeadas
        cursorWidth: 0,            // Ocultamos la línea de cursor por defecto
        height: 40,                // Altura de la onda
        normalize: true            // Ajusta los picos para que no se salgan del cuadro
    };

    // 1. Crear el reproductor de BORN AGAIN
    const ws1 = WaveSurfer.create({
        container: '#waveform-1',
        url: 'BORN AGAIN.mp3', // <-- ASEGÚRATE DE QUE ESTE NOMBRE SEA EXACTO AL DE TU ARCHIVO
        ...waveOptions
    });

    // 2. Crear el reproductor de YASUKE
    const ws2 = WaveSurfer.create({
        container: '#waveform-2',
        url: 'YASUKE.mp3', // <-- PON AQUÍ EL NOMBRE DE TU ARCHIVO DE AUDIO
        ...waveOptions
    });

    // 3. Crear el reproductor de DIVINA STRENGTH
    const ws3 = WaveSurfer.create({
        container: '#waveform-3',
        url: 'DIVINA STRENGTH.mp3', // <-- PON AQUÍ EL NOMBRE DE TU ARCHIVO DE AUDIO
        ...waveOptions
    });

    // Guardamos los reproductores y botones en arreglos para controlarlos juntos
    const wavesurfers = [ws1, ws2, ws3];
    const playButtons = [
        document.getElementById('btn-1'),
        document.getElementById('btn-2'),
        document.getElementById('btn-3')
    ];
    const volumeBars = [
        document.getElementById('vol-1'),
        document.getElementById('vol-2'),
        document.getElementById('vol-3')
    ];

    // Configurar los controles para cada canción
    wavesurfers.forEach((ws, index) => {
        const btn = playButtons[index];
        const vol = volumeBars[index];

        // Al hacer clic en Play/Pause
        btn.addEventListener('click', () => {
            // Pausar las otras canciones para que no suenen a la vez
            wavesurfers.forEach((otherWs, otherIndex) => {
                if (otherWs !== ws && otherWs.isPlaying()) {
                    otherWs.pause();
                }
            });
            // Reproducir o pausar la canción actual
            ws.playPause();
        });

        // Cambiar el ícono automáticamente cuando suena o se pausa
        ws.on('play', () => btn.textContent = "⏸");
        ws.on('pause', () => btn.textContent = "▶");

        // Controlar el volumen
        vol.addEventListener('input', (e) => {
            ws.setVolume(Number(e.target.value));
        });
    });
});