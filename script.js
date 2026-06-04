const API_URL = 'http://localhost:3000/api/games'; 

// ELEMENTOS DE LA PAGINA
const formulario = document.getElementById('formulario-juego');
const contenedorJuegos = document.getElementById('contenedor-juegos');
const btnCargar = document.getElementById('btn-cargar');
const btnCancelar = document.getElementById('btn-cancelar');
const tituloFormulario = document.getElementById('titulo-formulario');
const btnGuardar = document.getElementById('btn-guardar');

// Campos del formulario
const inputIdOriginal = document.getElementById('juego-id-original');
const inputId = document.getElementById('juego-id');
const inputNombre = document.getElementById('juego-nombre');
const inputMin = document.getElementById('juego-min');
const inputMax = document.getElementById('juego-max');
const inputDuracion = document.getElementById('juego-duracion');
const inputFecha = document.getElementById('juego-fecha');
const selectEstado = document.getElementById('juego-estado');


//OBTENER JUEGOS DESDE EL SERVIDOR
async function obtenerJuegos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('Error al conectar con el servidor.');
        
        const juegos = await respuesta.json();
        mostrarJuegos(juegos);
    } catch (error) {
        alert('Error al cargar la lista: ' + error.message);
    }
}


//MOSTRAR JUEGOS EN LA PAGINA
function mostrarJuegos(juegos) {
    contenedorJuegos.innerHTML = ''; //se limpia la lista
    
    if (juegos.length === 0) {
        contenedorJuegos.innerHTML = '<p>No hay juegos registrados en el inventario.</p>';
        return;
    }

    juegos.forEach(juego => {
        const articulo = document.createElement('article');
        articulo.innerHTML = `
            <h3>${juego.nombre} (ID: ${juego.id})</h3>
            <ul>
                <li><strong>Jugadores:</strong> ${juego.minJugadores} - ${juego.maxJugadores}</li>
                <li><strong>Duración:</strong> ${juego.duracionPromedio} min</li>
                <li><strong>Adquirido el:</strong> ${juego.fechaAdquisicion}</li>
                <li><strong>Estado:</strong> ${juego.estado}</li>
            </ul>
            <button onclick="prepararEdicion('${juego.id}', '${juego.nombre}', ${juego.minJugadores}, ${juego.maxJugadores}, ${juego.duracionPromedio}, '${juego.fechaAdquisicion}', '${juego.estado}')">Editar</button>
            <button onclick="eliminarJuego('${juego.id}')">Eliminar</button>
            <hr>
        `;
        contenedorJuegos.appendChild(articulo);
    });
}



//REGISTRAR JUEGO
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    const datosJuego = {
        id: inputId.value,
        nombre: inputNombre.value,
        minJugadores: parseInt(inputMin.value),
        maxJugadores: parseInt(inputMax.value),
        duracionPromedio: parseInt(inputDuracion.value),
        fechaAdquisicion: inputFecha.value,
        estado: selectEstado.value
    };

    const idOriginal = inputIdOriginal.value;
    const esEdicion = idOriginal !== '';

    let url = API_URL;
    let metodo = 'POST';

    // Si el id ya existe, actualizamos
    if (esEdicion) {
        url = `${API_URL}/${idOriginal}`;
        metodo = 'PUT';
    }

    try {
        const respuesta = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosJuego)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            
            throw new Error(resultado.mensaje || 'Error en la operación.');
        }

        alert(resultado.mensaje || 'Operación realizada con éxito');
        formulario.reset();
        limpiarModoEdicion();
        obtenerJuegos(); 

    } catch (error) {
        alert('Error: ' + error.message);
    }
});



//ELIMINAR JUEGO
async function eliminarJuego(id) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el juego con ID: ${id}?`)) return;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const resultado = await respuesta.json();
        if (!respuesta.ok) throw new Error(resultado.mensaje || 'No se pudo eliminar el juego.');

        alert(resultado.mensaje || 'Juego eliminado.');
        obtenerJuegos(); // Actualiza la interfaz
    } catch (error) {
        alert('Error: ' + error.message);
    }
}



window.prepararEdicion = function(id, nombre, min, max, duracion, fecha, estado) {
    tituloFormulario.textContent = "Editar Juego";
    btnGuardar.textContent = "Guardar Cambios";
    btnCancelar.style.display = "inline-block";

    inputIdOriginal.value = id;
    inputId.value = id;
    inputNombre.value = nombre;
    inputMin.value = min;
    inputMax.value = max;
    inputDuracion.value = duracion;
    inputFecha.value = fecha;
    selectEstado.value = estado;
};

function limpiarModoEdicion() {
    tituloFormulario.textContent = "Registrar Nuevo Juego";
    btnGuardar.textContent = "Registrar Juego";
    btnCancelar.style.display = "none";
    inputIdOriginal.value = '';
}

btnCancelar.addEventListener('click', () => {
    formulario.reset();
    limpiarModoEdicion();
});

btnCargar.addEventListener('click', obtenerJuegos);

//Se carga al refrescar la pagina
document.addEventListener('DOMContentLoaded', obtenerJuegos);