// Datos iniciales en memoria (respaldados con LocalStorage)
let mascotas = JSON.parse(localStorage.getItem('refugio_mascotas')) || [
    { id: 1, nombre: "Max", edad: "2 años", especie: "Perro", desc: "Rescatado en San Carlos. Muy amigable y activo.", icono: "🐕" },
    { id: 2, nombre: "Luna", edad: "8 meses", especie: "Gato", desc: "Tranquila y esterilizada. Busca hogar seguro.", icono: "🐈" },
    { id: 3, nombre: "Rocky", edad: "3 años", especie: "Perro", desc: "Protector, ideal para casa con patio.", icono: "🦮" }
];

let reportes = JSON.parse(localStorage.getItem('refugio_reportes')) || [
    { ubi: "Parque Zonal Huiracocha (SJL)", estado: "Posible Abandono", desc: "Perrito mestizo cerca de la puerta principal.", tiempo: "Hace 15 min" },
    { ubi: "Estación San Carlos", estado: "Asustado", desc: "Gatito pequeño buscando refugio bajo los torniquetes.", tiempo: "Hace 40 min" }
];

let indiceMascotaActual = 0;
let rolActual = 'normal';

// Inicialización al cargar la app
document.addEventListener("DOMContentLoaded", () => {
    actualizarTarjetaAdopcion();
    renderizarReportes();
});

function iniciarSesion() {
    rolActual = document.getElementById('user-role').value;
    document.getElementById('perfil-nombre').innerText = "Dany Vela";
    
    const badge = document.getElementById('perfil-rol-badge');
    const navPub = document.getElementById('nav-item-publicar');

    if(rolActual === 'profesional') {
        badge.innerText = "Rescatista Verificado";
        badge.style.background = "#C6F6D5";
        badge.style.color = "#276749";
        navPub.style.display = 'flex';
    } else {
        badge.innerText = "Ciudadano / Adoptante";
        badge.style.background = "#E2E8F0";
        badge.style.color = "#4A5568";
        navPub.style.display = 'none';
    }

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
}

function cerrarSesion() {
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
}

function cambiarVista(idVista, elementoMenu, titulo) {
    document.getElementById('app-header').innerHTML = `${titulo} <span>🐾</span>`;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(idVista).classList.add('active-view');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    elementoMenu.classList.add('active');
}

// Lógica de Adopción (Swipe)
function actualizarTarjetaAdopcion() {
    const contenedor = document.getElementById('tarjeta-contenedor');
    
    if (mascotas.length === 0 || indiceMascotaActual >= mascotas.length) {
        contenedor.innerHTML = `
            <div class="pet-card" style="align-items: center; justify-content: center; text-align: center; padding: 20px;">
                <div style="font-size: 50px; margin-bottom: 10px;">🎉</div>
                <h2>¡No hay más mascotas!</h2>
                <p>Has visto todas las opciones disponibles por ahora.</p>
            </div>
        `;
        document.getElementById('controles-swipe').style.display = 'none';
        return;
    }

    const m = mascotas[indiceMascotaActual];
    contenedor.innerHTML = `
        <div class="pet-card">
            <div class="pet-image-placeholder">${m.icono}</div>
            <div class="pet-info">
                <h2>${m.nombre}, ${m.edad}</h2>
                <p>${m.especie} • Rescatado</p>
                <p style="margin-top: 8px;">${m.desc}</p>
            </div>
        </div>
    `;
    document.getElementById('controles-swipe').style.display = 'flex';
}

function manejarSwipe(dir) {
    const tarjeta = document.querySelector('.pet-card');
    if (!tarjeta) return;

    tarjeta.style.transform = dir === 'izq' ? 'translateX(-120%) rotate(-15deg)' : 'translateX(120%) rotate(15deg)';
    tarjeta.style.opacity = '0';

    setTimeout(() => {
        indiceMascotaActual++;
        actualizarTarjetaAdopcion();
    }, 300);
}

// Lógica de Reportes
function renderizarReportes() {
    const feed = document.getElementById('feed-reportes');
    feed.innerHTML = reportes.map(r => `
        <div class="report-item">
            <span class="report-tag">${r.estado}</span>
            <h4>📍 ${r.ubi}</h4>
            <p>${r.desc}</p>
            <div class="report-meta">
                <span>${r.tiempo}</span>
                <span>📸 Ver Foto</span>
            </div>
        </div>
    `).join('');
}

function abrirModal() { document.getElementById('modal-reporte').style.display = 'flex'; }
function cerrarModal() { document.getElementById('modal-reporte').style.display = 'none'; }

function enviarReporte() {
    const ubi = document.getElementById('rep-ubi').value || "Ubicación en SJL";
    const estado = document.getElementById('rep-estado').value;

    reportes.unshift({
        ubi: ubi,
        estado: estado,
        desc: "Reporte emitido desde la app móvil. Pendiente de ayuda.",
        tiempo: "Hace un momento"
    });

    localStorage.setItem('refugio_reportes', JSON.stringify(reportes));
    renderizarReportes();
    document.getElementById('rep-ubi').value = '';
    cerrarModal();
    alert("¡Alerta enviada con éxito a la red de apoyo!");
}

// Publicar Mascota (Perfil profesional)
function publicarMascota() {
    const nombre = document.getElementById('pub-nombre').value;
    const especie = document.getElementById('pub-especie').value;
    const edad = document.getElementById('pub-edad').value;
    const desc = document.getElementById('pub-desc').value;

    if (!nombre || !desc) {
        alert("Por favor completa los campos principales.");
        return;
    }

    mascotas.push({
        id: mascotas.length + 1,
        nombre: nombre,
        edad: edad || "Desconocida",
        especie: especie,
        desc: desc,
        icono: especie === 'Perro' ? '🐕' : '🐈'
    });

    localStorage.setItem('refugio_mascotas', JSON.stringify(mascotas));
    
    // Resetear formulario y volver al feed
    document.getElementById('pub-nombre').value = '';
    document.getElementById('pub-edad').value = '';
    document.getElementById('pub-desc').value = '';
    
    alert("Mascota publicada correctamente.");
    cambiarVista('view-adoptar', document.querySelectorAll('.nav-item')[0], 'Adopta');
    indiceMascotaActual = 0;
    actualizarTarjetaAdopcion();
}
