// app.js

// 1. Datos simulados de la base de datos
const mascotas = [
    {
        id: 1,
        nombre: "Luna",
        especie: "Perro",
        edad: "2 años",
        img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80",
        urgente: false
    },
    {
        id: 2,
        nombre: "Milo",
        especie: "Gato",
        edad: "6 meses",
        img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80",
        urgente: true
    },
    {
        id: 3,
        nombre: "Rex",
        especie: "Perro",
        edad: "5 años",
        img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80",
        urgente: false
    }
];

// 2. Función altamente optimizada para renderizar la interfaz
function cargarMascotas() {
    const grid = document.getElementById('mascotas-grid');
    grid.innerHTML = ''; 

    // Optimización: DocumentFragment inyecta todo de una vez, mejorando el rendimiento
    const fragmentoDOM = document.createDocumentFragment();

    mascotas.forEach(mascota => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300";
        
        const badgeUrgente = mascota.urgente ? `<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">Caso Urgente</span>` : '';

        card.innerHTML = `
            <div class="relative">
                <img src="${mascota.img}" alt="Foto de ${mascota.nombre}" class="w-full h-48 object-cover" loading="lazy">
                ${badgeUrgente}
            </div>
            <div class="p-5">
                <h3 class="text-xl font-bold text-gray-800">${mascota.nombre}</h3>
                <p class="text-sm text-gray-500 mb-4">${mascota.especie} • ${mascota.edad}</p>
                <div class="flex justify-between items-center">
                    <button class="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-200 transition">Adoptar</button>
                    <!-- Se actualizó el botón a Premium -->
                    <button class="text-yellow-500 hover:text-yellow-600 font-medium text-sm">💖 Premium</button>
                </div>
            </div>
        `;
        fragmentoDOM.appendChild(card);
    });
    
    // Insertamos todas las tarjetas de un solo golpe
    grid.appendChild(fragmentoDOM);
}

// 3. Manejo de eventos del formulario
document.getElementById('form-reporte').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const ubicacion = document.getElementById('ubicacion').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    
    // Validación básica para evitar envíos vacíos
    if(ubicacion && descripcion) {
        alert(`¡Gracias! Hemos registrado la alerta en: ${ubicacion}. Los rescatistas de la zona han sido notificados.`);
        this.reset(); 
    }
});

// 4. Inicializar la app
document.addEventListener('DOMContentLoaded', cargarMascotas);
