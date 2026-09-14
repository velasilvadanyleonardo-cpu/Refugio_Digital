// AÑADE ESTAS FUNCIONES EN TU ARCHIVO app.js PARA CONTROLAR LA NUEVA PÁGINA DE BIENVENIDA

function explorarSinCuenta() {
    document.getElementById('landing-screen').style.display = 'none';
    // Opcional: Establecer rol invitado
    window.usuarioActual = { nombre: "Invitado", email: "invitado@refugio.com", rol: "normal" };
    document.getElementById('main-app').style.display = 'flex';
    if (window.innerWidth >= 768) {
        document.getElementById('app-container').classList.add('logged-in');
    }
    renderizarTodo();
}

function abrirGoogleModalDesdeLanding() {
    // Si prefieres mostrar el selector de rol antes de autenticar, o lanzar directo el modal de Google
    document.getElementById('google-modal').style.display = 'flex';
}

function cerrarSesion() {
    window.usuarioActual = null;
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('app-container').classList.remove('logged-in');
    document.getElementById('landing-screen').style.display = 'flex';
}
