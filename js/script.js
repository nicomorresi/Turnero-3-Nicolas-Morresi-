// Recuperar turnos del localStorage al cargar la página
let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
let horaInicio = 9; // Hora de inicio para los turnos (ejemplo: 9 AM)

function calcularFechaTurno() {
    let nextHour = new Date();
    let turnosPorHora = 1; // Cambiar este valor si quieres más de un turno por hora
    let horasTranscurridas = Math.floor(turnos.length / turnosPorHora);
    
    nextHour.setHours(horaInicio + horasTranscurridas);
    nextHour.setMinutes(0); // Minutos a 0
    return nextHour.toLocaleString();
}

function obtenerDatosTurno() {
    let nombre = document.getElementById("nombre").value;
    let tipoVehiculo = document.getElementById("tipoVehiculo").value;
    let marca = document.getElementById("marca").value;
    let servicio = document.getElementById("servicio").value;
    
    // Validación de datos
    if (!nombre || !tipoVehiculo || !marca || !servicio) {
        mostrarMensaje("Todos los campos son obligatorios.", "danger");
        return null;
    }

    return {
        nombre,
        tipoVehiculo,
        marca,
        servicio,
        fecha: calcularFechaTurno()
    };
}

// Mostrar mensaje en la parte superior
function mostrarMensaje(mensaje, tipo) {
    const mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.textContent = mensaje;
    mensajeElemento.className = `alert alert-${tipo}`;
    mensajeElemento.style.display = 'block';

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        mensajeElemento.style.display = 'none';
    }, 3000);
}

function mostrarTurnos() {
    const contenedor = document.getElementById("turnos");
    contenedor.innerHTML = ''; // Limpiar contenido anterior

    if (turnos.length === 0) {
        contenedor.innerHTML = '<p>No hay turnos programados.</p>';
        return;
    }

    let tabla = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Vehículo</th>
                    <th>Marca</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    turnos.forEach((turno, index) => {
        tabla += `
            <tr>
                <td>${index + 1}</td>
                <td>${turno.nombre}</td>
                <td>${turno.tipoVehiculo}</td>
                <td>${turno.marca}</td>
                <td>${turno.servicio}</td>
                <td>${turno.fecha}</td>
            </tr>
        `;
    });

    tabla += '</tbody></table>';
    contenedor.innerHTML = tabla;
}

function guardarTurno(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    
    let nuevoTurno = obtenerDatosTurno();
    if (nuevoTurno) {
        turnos.push(nuevoTurno);
        localStorage.setItem('turnos', JSON.stringify(turnos)); // Guardar en localStorage
        mostrarTurnos(); // Actualizar la lista de turnos
        mostrarMensaje("Turno agregado correctamente.", "success"); // Notificar al usuario
        document.getElementById("formTurno").reset(); // Limpiar formulario
    }
}

// Cargar los turnos desde el localStorage al cargar la página
document.addEventListener("DOMContentLoaded", mostrarTurnos);

document.getElementById("formTurno").addEventListener("submit", guardarTurno);

