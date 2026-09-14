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
function manejarSesion(emailIngresado) {
    const CORREO_ADMIN = "velasilvadanyleonardo@gmail.com";
    let rolUsuario = "usuario";

    if (emailIngresado.trim().toLowerCase() === CORREO_ADMIN) {
        rolUsuario = "admin";
    }

    const usuarioActual = {
        email: emailIngresado,
        rol: rolUsuario
    };

    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    verificarVistaUsuario();
}

function verificarVistaUsuario() {
    const sesion = JSON.parse(localStorage.getItem("usuarioActual"));
    const divAdmin = document.getElementById("panelAdmin");

    if (!sesion || !divAdmin) return;

    if (sesion.rol === "admin") {
        divAdmin.style.display = "block";
        cargarDatosGlobalesAdmin();
    } else {
        divAdmin.style.display = "none";
    }
}

function cargarDatosGlobalesAdmin() {
    const tbody = document.getElementById("cuerpoTablaAdmin");
    if (!tbody) return;
    tbody.innerHTML = "";

    const registros = JSON.parse(localStorage.getItem("registrosGlobales")) || [];

    if (registros.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">No hay registros globales todavía.</td></tr>`;
        return;
    }

    registros.forEach((item, index) => {
        let fila = `<tr>
            <td>${item.tipo}</td>
            <td>${item.detalle}</td>
            <td><button onclick="eliminarRegistroGlobal(${index})">Eliminar</button></td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

function eliminarRegistroGlobal(index) {
    let registros = JSON.parse(localStorage.getItem("registrosGlobales")) || [];
    registros.splice(index, 1);
    localStorage.setItem("registrosGlobales", JSON.stringify(registros));
    cargarDatosGlobalesAdmin();
}

function cerrarSesionAdmin() {
    localStorage.removeItem("usuarioActual");
    location.reload();
}

window.addEventListener('load', function() {
    verificarVistaUsuario();
});
