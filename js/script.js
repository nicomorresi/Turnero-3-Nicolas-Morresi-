let turnos = [];
let horaInicio = 9; // Hora de inicio para los turnos (ejemplo: 9 AM)

function obtenerDatosTurno() {
    let nombre = prompt("¿Cuál es tu nombre?");
    while (!nombre) {
        nombre = prompt("Por favor, ingresa tu nombre:");
    }

    let tipoVehiculo = prompt("¿Qué tipo de vehículo tienes? (1: Auto, 2: Camioneta, 3: Traffic)");
    while (!['1', '2', '3'].includes(tipoVehiculo)) {
        tipoVehiculo = prompt("Por favor, selecciona un tipo de vehículo válido (1: Auto, 2: Camioneta, 3: Traffic):");
    }

    let marca = prompt("¿De qué marca es tu vehículo?");
    while (!marca) {
        marca = prompt("Por favor, ingresa la marca de tu vehículo:");
    }

    let servicio = prompt("¿Qué tipo de servicio deseas? (1: Lavado básico, 2: Lavado completo, 3: Tratamiento)");
    while (!['1', '2', '3'].includes(servicio)) {
        servicio = prompt("Por favor, selecciona un servicio válido (1: Lavado básico, 2: Lavado completo, 3: Tratamiento):");
    }

    return {
        nombre,
        tipoVehiculo: tipoVehiculo === '1' ? 'Auto' : tipoVehiculo === '2' ? 'Camioneta' : 'Traffic',
        marca,
        servicio: servicio === '1' ? 'Lavado básico' : servicio === '2' ? 'Lavado completo' : 'Tratamiento',
        fecha: calcularFechaTurno()
    };
}

function calcularFechaTurno() {
    let nextHour = new Date();
    let turnosPorHora = 1; // Cambiar este valor si quieres más de un turno por hora
    let horasTranscurridas = Math.floor(turnos.length / turnosPorHora);
    
    nextHour.setHours(horaInicio + horasTranscurridas);
    nextHour.setMinutes(0); // Minutos a 0
    return nextHour.toLocaleString();
}

function mostrarTurnos() {
    const contenedor = document.getElementById("turnos");
    contenedor.innerHTML = ''; // Limpiar contenido anterior

    if (turnos.length === 0) {
        contenedor.innerHTML = '<p>No hay turnos programados.</p>';
        return;
    }

    turnos.forEach((turno, index) => {
        contenedor.innerHTML += `
            <div class="alert alert-info">
                <strong>Turno ${index + 1}:</strong> ${turno.nombre} - ${turno.tipoVehiculo} - ${turno.marca} - ${turno.servicio} - ${turno.fecha}
            </div>
        `;
    });
}

function main() {
    let continuar = true;

    while (continuar) {
        let nuevoTurno = obtenerDatosTurno();
        turnos.push(nuevoTurno);
        mostrarTurnos();
        continuar = confirm("¿Deseas agregar otro turno?");
    }
}

document.getElementById("iniciar").addEventListener("click", main);
