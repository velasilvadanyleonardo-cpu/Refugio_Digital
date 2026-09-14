let mascotas = JSON.parse(localStorage.getItem('refugio_mascotas')) || [
    { 
        id: 1, 
        nombre: "Max", 
        edad: "2 años", 
        especie: "Perro", 
        desc: "Rescatado en San Carlos. Muy amigable, activo y vacunado, busca familia.", 
        imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 2, 
        nombre: "Luna", 
        edad: "8 meses", 
        especie: "Gato", 
        desc: "Tranquila, cariñosa y esterilizada. Acostumbrada a vivir en departamento.", 
        imagen: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        id: 3, 
        nombre: "Rocky", 
        edad: "3 años", 
        especie: "Perro", 
        desc: "Protector e inteligente, ideal para una casa con espacio o patio amplio.", 
        imagen: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80" 
    }
];

let reportes = JSON.parse(localStorage.getItem('refugio_reportes')) || [
    { ubi: "Parque Zonal Huiracocha (SJL)", estado: "Posible Abandono", desc: "Perrito mestizo cerca de la puerta principal.", tiempo: "Hace 15 min", foto: null },
    { ubi: "Estación San Carlos", estado: "Asustado", desc: "Gatito pequeño buscando refugio bajo los torniquetes.", tiempo: "Hace 40 min", foto: null }
];

let rolActual = 'normal';
let usuarioActual = JSON.parse(localStorage.getItem('refugio_usuario')) || null;

document.addEventListener("DOMContentLoaded", () => {
    renderizarAdopciones();
    renderizarReportes();
    
    // Si ya había una sesión guardada, ingresa directo
    if(usuarioActual) {
        aplicarSesionUsuario();
    }
});

// Control de Google Login Modal
function abrirGoogleModal() {
    document.getElementById('google-modal').style.display = 'flex';
}

function cerrarGoogleModal() {
    document.getElementById('google-modal').style.display = 'none';
}

function confirmarGoogleLogin() {
    const nombre = document.getElementById('google-nombre').value.trim();
    const email = document.getElementById('google-email').value.trim();

    if(!nombre || !email) {
        alert("Por favor ingresa tu nombre y correo electrónico.");
        return;
    }

    rolActual = document.getElementById('user-role').value;
    usuarioActual = { nombre, email, rol: rolActual };
    
    localStorage.setItem('refugio_usuario', JSON.stringify(usuarioActual));
    cerrarGoogleModal();
    aplicarSesionUsuario();
}

function aplicarSesionUsuario() {
    document.getElementById('perfil-nombre').innerText = usuarioActual.nombre;
    document.getElementById('perfil-email').innerText = usuarioActual.email;
    
    const badge = document.getElementById('perfil-rol-badge');
    const navPubMobile = document.getElementById('nav-item-publicar');
    const navPubDesktop = document.getElementById('desktop-nav-publicar');

    if(usuarioActual.rol === 'profesional') {
        badge.innerText = "Rescatista Verificado";
        badge.style.background = "#C6F6D5";
        badge.style.color = "#276749";
        if(navPubMobile) navPubMobile.style.display = 'flex';
        if(navPubDesktop) navPubDesktop.style.display = 'flex';
    } else {
        badge.innerText = "Ciudadano / Adoptante";
        badge.style.background = "#E2E8F0";
        badge.style.color = "#4A5568";
        if(navPubMobile) navPubMobile.style.display = 'none';
        if(navPubDesktop) navPubDesktop.style.display = 'none';
    }

    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = window.innerWidth >= 768 ? 'flex' : 'flex';
}

function cerrarSesion() {
    localStorage.removeItem('refugio_usuario');
    usuarioActual = null;
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
}

// Navegación Computadora (Sidebar)
function cambiarVistaDesktop(idVista, elementoMenu, titulo) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(idVista).classList.add('active-view');
    document.querySelectorAll('.desktop-nav-item').forEach(b => b.classList.remove('active'));
    elementoMenu.classList.add('active');
}

// Navegación Celular (Bottom Bar)
function cambiarVistaMobile(idVista, elementoMenu, titulo) {
    document.getElementById('app-header').innerHTML = `${titulo} <span>🐾</span>`;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(idVista).classList.add('active-view');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    elementoMenu.classList.add('active');
}

// 1. Catálogo Libre de Adopción
function renderizarAdopciones() {
    const feed = document.getElementById('feed-adoptar');
    
    if (mascotas.length === 0) {
        feed.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding: 30px;">No hay mascotas registradas por el momento.</p>`;
        return;
    }

    feed.innerHTML = mascotas.map(m => `
        <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); display: flex; flex-direction: column;">
            <div style="width: 100%; height: 200px; overflow: hidden; background: #E2E8F0;">
                <img src="${m.imagen}" style="width: 100%; height: 100%; object-fit: cover;" alt="${m.nombre}">
            </div>
            <div style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <h3 style="font-size: 18px; color: var(--text-main);">${m.nombre}, <span style="font-size: 14px; font-weight: normal; color: var(--text-muted);">${m.edad}</span></h3>
                        <span style="background: #FFF5F2; color: var(--primary); padding: 3px 8px; border-radius: 8px; font-size: 11px; font-weight: bold;">${m.especie}</span>
                    </div>
                    <p style="color: var(--text-muted); font-size: 13px; line-height: 1.4; margin-bottom: 14px;">${m.desc}</p>
                </div>
                <button onclick="alert('¡Gracias por tu interés en adoptar a ${m.nombre}! Nos pondremos en contacto contigo pronto.')" style="background: var(--primary); color: white; border: none; padding: 12px; border-radius: 10px; width: 100%; font-weight: bold; font-size: 13px; cursor: pointer; box-shadow: 0 2px 4px rgba(255,112,67,0.3);">
                    Quiero adoptar
                </button>
            </div>
        </div>
    `).join('');
}

// 2. Renderizado de Reportes
function renderizarReportes() {
    const feed = document.getElementById('feed-reportes');
    feed.innerHTML = reportes.map(r => `
        <div class="report-item">
            <span class="report-tag">${r.estado}</span>
            <h4>📍 ${r.ubi}</h4>
            <p>${r.desc}</p>
            ${r.foto ? `<img src="${r.foto}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 10px; margin-bottom: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">` : ''}
            <div class="report-meta">
                <span>${r.tiempo}</span>
                <span>${r.foto ? '📸 Foto adjunta' : 'Sin fotografía'}</span>
            </div>
        </div>
    `).join('');
}

function abrirModal() { document.getElementById('modal-reporte').style.display = 'flex'; }
function cerrarModal() { document.getElementById('modal-reporte').style.display = 'none'; }

function mostrarNombreArchivo(input) {
    if (input.files && input.files[0]) {
        document.getElementById('upload-text').innerText = '📁 ' + input.files[0].name + ' (Listo)';
    }
}

// 3. Envío de Reporte
function enviarReporte() {
    const ubi = document.getElementById('rep-ubi').value || "Ubicación en SJL";
    const estado = document.getElementById('rep-estado').value;
    const fileInput = document.getElementById('rep-file');

    const finalizarRegistro = (fotoBase64) => {
        reportes.unshift({
            ubi: ubi,
            estado: estado,
            desc: "Reporte emitido desde la app. Pendiente de verificación en zona.",
            tiempo: "Hace un momento",
            foto: fotoBase64
        });

        localStorage.setItem('refugio_reportes', JSON.stringify(reportes));
        renderizarReportes();
        
        document.getElementById('rep-ubi').value = '';
        fileInput.value = '';
        document.getElementById('upload-text').innerText = '📸 Adjuntar fotografía del animal';
        cerrarModal();
        alert("¡Alerta enviada con éxito a la red de apoyo!");
    };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            finalizarRegistro(e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        finalizarRegistro(null);
    }
}

// 4. Publicar Mascota
function publicarMascota() {
    const nombre = document.getElementById('pub-nombre').value;
    const especie = document.getElementById('pub-especie').value;
    const edad = document.getElementById('pub-edad').value;
    const desc = document.getElementById('pub-desc').value;

    if (!nombre || !desc) {
        alert("Por favor completa los campos principales.");
        return;
    }

    const imagenDefault = especie === 'Perro' 
        ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80" 
        : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80";

    mascotas.push({
        id: mascotas.length + 1,
        nombre: nombre,
        edad: edad || "Desconocida",
        especie: especie,
        desc: desc,
        imagen: imagenDefault
    });

    localStorage.setItem('refugio_mascotas', JSON.stringify(mascotas));
    renderizarAdopciones();
    
    document.getElementById('pub-nombre').value = '';
    document.getElementById('pub-edad').value = '';
    document.getElementById('pub-desc').value = '';
    
    alert("Mascota publicada correctamente.");
    cambiarVistaMobile('view-adoptar', document.querySelectorAll('.nav-item')[0], 'Adopta');
}
