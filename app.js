// Abrir el modal de inicio de sesión con Google desde la pantalla de bienvenida
function abrirGoogleModalDesdeLanding() {
    const googleModal = document.getElementById('google-modal');
    if (googleModal) {
        googleModal.style.display = 'flex';
    }
}

// Cerrar el modal de inicio de sesión de Google
function cerrarGoogleModal() {
    const googleModal = document.getElementById('google-modal');
    if (googleModal) {
        googleModal.style.display = 'none';
    }
}

// Saltar la autenticación y entrar directamente a explorar la app
function explorarSinCuenta() {
    const landingScreen = document.getElementById('landing-screen');
    const mainApp = document.getElementById('main-app');
    const appContainer = document.getElementById('app-container');

    if (landingScreen) {
        landingScreen.style.display = 'none';
    }
    if (mainApp) {
        mainApp.style.display = 'flex';
    }
    if (appContainer) {
        appContainer.classList.add('logged-in');
    }
}

// Simular una autenticación exitosa mediante Google y pasar al panel principal
function simularLoginGoogleExitoso() {
    cerrarGoogleModal();
    explorarSinCuenta();
}

// Cerrar sesión y regresar a la pantalla de bienvenida vibrante
function cerrarSesion() {
    const landingScreen = document.getElementById('landing-screen');
    const mainApp = document.getElementById('main-app');
    const appContainer = document.getElementById('app-container');

    if (landingScreen) {
        landingScreen.style.display = 'flex';
    }
    if (mainApp) {
        mainApp.style.display = 'none';
    }
    if (appContainer) {
        appContainer.classList.remove('logged-in');
    }
}
