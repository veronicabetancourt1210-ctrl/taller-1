import * as gamesService from './games.service.js';

//CREAR JUEGO
export const createJuego = (req, res) => {
   
    const { nombre, minJugadores, maxJugadores, duracionPromedio, fechaAdquisicion, estado } = req.body;

    //Validacion para registrar un juego
    if (!nombre || !minJugadores || !maxJugadores || !duracionPromedio || !fechaAdquisicion || !estado) {
        return res.status(400).json({ 
            error: "Datos incompletos", 
            mensaje: "Fallo el registro del juego. Todos los campos (nombre, jugadores, duración, fecha y estado) son obligatorios." 
        });
    }

    
    const estadosValidos = ["En perfectas condiciones", "Ligeramente usado", "Deteriorado", "Dañado"];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: "Estado inválido", mensaje: `Fallo en el registro del juego. El estado debe ser uno de los siguientes: ${estadosValidos.join(", ")}`  });
    }

    const nuevo = gamesService.create(req.body);
    res.status(201).json({ mensaje: "Juego registrado con éxito", juego: nuevo });
    

};

//BUSQUEDA DE JUEGOS
export const getJuegos = (req, res) => {
    const catalogo = gamesService.getAll();
    res.status(200).json(catalogo);
};

//BUSQUEDA DE JUEGOS POR ID
export const getJuego = (req, res) => {
    const juego = gamesService.getById(parseInt(req.params.id));
    if (juego) {
        res.status(200).json(juego);
    } else {
        res.status(404).json({ mensaje: "El juego no fue encontrado" });
    }
};


//ACTUALIZACION JUEGO
export const updateJuego = (req, res) => {
    const actualizado = gamesService.update(parseInt(req.params.id), req.body);
    if (actualizado) {
        res.status(200).json({ mensaje: "El juego fue actualizado exitosamente", juego: actualizado });
    } else {
        res.status(404).json({ mensaje: "No se pudo actualizar, juego no encontrado" });
    }
};

//ELIMINAR JUEGO
export const deleteJuego = (req, res) => {
    const eliminado = gamesService.remove(parseInt(req.params.id));
    if (eliminado) {
        res.status(200).json({ mensaje: "El juego fue eliminado del catálogo exitosamente" });
    } else {
        res.status(404).json({ mensaje: "No se pudo eliminar, juego no encontrado" });
    }
};