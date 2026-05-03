//INICIALIZACION DE CATALOGO
let juegos = [
    { 
        id: 1, 
        nombre: "Uno", 
        minJugadores: 2, 
        maxJugadores: 10, 
        duracionPromedio: 20, 
        fechaAdquisicion: "2024-05-02", 
        estado: "En perfectas condiciones" 
    }
];

//INGRESAR JUEGO A CATALOGO
export const create = (data) => {
    const estadosValidos = ["En perfectas condiciones", "Ligeramente usado", "Deteriorado", "Dañado"];
    

    const nuevoJuego = {
        id: juegos.length > 0 ? juegos[juegos.length - 1].id + 1 : 1, 
        ...data //id autogenerado
    };
    
    juegos.push(nuevoJuego);
    return nuevoJuego;
};

//Consultar todo el catálogo
export const getAll = () => juegos;

//Buscar en Catálogo
export const getById = (id) => juegos.find(j => j.id === id);

//Actualizar Catálogo
export const update = (id, data) => {
    const index = juegos.findIndex(j => j.id === id);
    if (index !== -1) {
        // Mantenemos el ID original e integramos los nuevos datos
        juegos[index] = { ...juegos[index], ...data, id };
        return juegos[index];
    }
    return null;
};

//Eliminar juego de catálogo
export const remove = (id) => {
    const index = juegos.findIndex(j => j.id === id);
    if (index !== -1) {
        juegos.splice(index, 1);
        return true; 
    }
    return false; 
};