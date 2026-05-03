import * as gamesService from './games.service.js';

//CREAR JUEGO
export const createJuego = (req, res) => {
   const { id, nombre, minJugadores, maxJugadores, duracionPromedio, fechaAdquisicion, estado } = req.body;

    //Validación de campos obligatorios
    const camposObligatorios = [id, nombre, minJugadores, maxJugadores, duracionPromedio, fechaAdquisicion, estado];
    if (camposObligatorios.some(campo => campo === undefined || campo === "")) {
        return res.status(400).json({ 
            error: "Datos incompletos", 
            mensaje: "Fallo el registro del juego. Todos los campos, incluyendo el ID, son obligatorios." 
        });
    }

    // Validación de Tipos Numéricos 
    if (typeof minJugadores !== 'number' || minJugadores < 1) {
        return res.status(400).json({ 
            error: "Dato inválido", 
            mensaje: "El mínimo de jugadores debe ser un número mayor o igual a 1." 
        });
    }

    if (typeof maxJugadores !== 'number' || maxJugadores < minJugadores) {
        return res.status(400).json({ 
            error: "Dato inválido", 
            mensaje: "El máximo de jugadores debe ser un número y no puede ser menor al mínimo." 
        });
    }

    if (typeof duracionPromedio !== 'number' || duracionPromedio <= 0) {
        return res.status(400).json({ 
            error: "Dato inválido", 
            mensaje: "La duración promedio debe ser un número positivo." 
        });
    }

    // Validación de Formato de Fecha 
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexFecha.test(fechaAdquisicion) || isNaN(Date.parse(fechaAdquisicion))) {
        return res.status(400).json({ 
            error: "Formato inválido", 
            mensaje: "La fecha debe tener el formato YYYY-MM-DD (ej: 2024-05-03)." 
        });
    }

    //Validación de Estados Válidos
    const estadosValidos = ["En perfectas condiciones", "Ligeramente usado", "Deteriorado", "Dañado"];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
            error: "Estado no válido",
            mensaje: `El estado '${estado}' no es permitido. Los estados válidos son: ${estadosValidos.join(", ")}.`
        });
    }

    //Validar que el ID no esté duplicado
    const juegoExistente = gamesService.getById(id); 
    if (juegoExistente) {
        return res.status(409).json({ 
            error: "ID duplicado",
            mensaje: `Ya existe un juego registrado con el ID ${id}. Por favor, usa uno diferente.`
        });
    }

    //Registro del juego
    const nuevo = gamesService.create(req.body);
    return res.status(201).json({ 
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
    const idParam = req.params.id;
    const { id: idBody, estado, minJugadores, maxJugadores, duracionPromedio, fechaAdquisicion } = req.body;

    // Validación de Estados Válidos
    if (estado) {
        const estadosValidos = ["En perfectas condiciones", "Ligeramente usado", "Deteriorado", "Dañado"];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({
                error: "Estado no válido",
                mensaje: `El estado '${estado}' no es permitido. Estados válidos: ${estadosValidos.join(", ")}.`
            });
        }
    }

    //  Validación de Números 
    if (minJugadores !== undefined) {
        if (typeof minJugadores !== 'number' || minJugadores < 1) {
            return res.status(400).json({ 
                error: "Dato inválido", 
                mensaje: "El mínimo de jugadores debe ser un número mayor o igual a 1." 
            });
        }
    }

    if (maxJugadores !== undefined) {
        if (typeof maxJugadores !== 'number' || maxJugadores < minJugadores) {
            return res.status(400).json({ 
                error: "Dato inválido", 
                mensaje: "El máximo de jugadores debe ser un número y no puede ser menor al mínimo." 
            });
        }
    }

    if (duracionPromedio !== undefined && (typeof duracionPromedio !== 'number' || duracionPromedio <= 0)) {
        return res.status(400).json({ 
            error: "Dato inválido", 
            mensaje: "La duración promedio debe ser un número positivo." 
        });
    }

    // Validación de Formato de Fecha (YYYY-MM-DD)
    if (fechaAdquisicion) {
        const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexFecha.test(fechaAdquisicion) || isNaN(Date.parse(fechaAdquisicion))) {
            return res.status(400).json({ 
                error: "Formato inválido", 
                mensaje: "La fecha debe tener el formato YYYY-MM-DD (ej: 2024-05-03)." 
            });
        }
    }

    // Validación de ID Duplicado
    if (idBody && String(idBody) !== String(idParam)) {
        const juegoConEseId = gamesService.getById(idBody);
        if (juegoConEseId) {
            return res.status(409).json({
                error: "ID en conflicto",
                mensaje: `No puedes cambiar al ID ${idBody} porque ya pertenece a otro juego.`
            });
        }
    }

    // Actualización
    const actualizado = gamesService.update(idParam, req.body);

    if (actualizado) {
        return res.status(200).json({ 
            mensaje: "El juego fue actualizado exitosamente", 
            juego: actualizado 
        });
    } else {
        return res.status(404).json({ 
            mensaje: "No se pudo actualizar, juego no encontrado" 
        });
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
