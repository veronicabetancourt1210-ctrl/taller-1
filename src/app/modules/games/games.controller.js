import * as gamesService from './games.service.js';

//CREAR JUEGO
export const createJuego = (req, res) => {
   const { id, nombre, minJugadores, maxJugadores, duracionPromedio, fechaAdquisicion, estado } = req.body;

    //Validar que el juego a registrar tenga todos sus campos
    const campos = [id, nombre, minJugadores, maxJugadores, duracionPromedio, fechaAdquisicion, estado];
    
    if (campos.some(campo => campo === undefined || campo === "")) {
        return res.status(400).json({ 
            error: "Datos incompletos", 
            mensaje: "Fallo el registro del juego. Todos los campos, incluyendo el ID, son obligatorios." 
        });
    }

    //Validar que el estado ingresado sea alguno de los estados validos
    const estadosValidos = ["En perfectas condiciones", "Ligeramente usado", "Deteriorado", "Dañado"];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
            error: "Estado no válido",
            mensaje: `El estado '${estado}' no es permitido. Los estados válidos son: ${estadosValidos.join(", ")}.`
        });
    }

    // Validar que el id ingresado no exista en la base de datos
    const juegoExistente = gamesService.getById(id); 
    if (juegoExistente) {
        return res.status(409).json({ 
            error: "ID duplicado",
            mensaje: `Ya existe un juego registrado con el ID ${id}. Por favor, usa uno diferente.`
        });
    }

    //Registro del juego
    const nuevo = gamesService.create(req.body);
    res.status(201).json({ 
        mensaje: "Juego registrado con éxito", 
        juego: nuevo 
    });

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
