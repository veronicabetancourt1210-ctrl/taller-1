# Taller 1 - Programación Orientada a la Web
Estudiante : Veronica Betancourt
Prof.: Luis Fuentes

Este proyecto es una API REST desarrollada en un servidor Express para el CRUD de un inventario de juegos.

## Sobre las funcionalidades
El servidor corre por defecto en http://localhost:3000
Para probar las funcionalidades del CRUD, se debe anidar dicha ruta con /api/games

Ver todo el catalogo: GET http://localhost:3000/api/games

Buscar un juego por id: GET http://localhost:3000/api/games/id

Crear nuevo juego: POST http://localhost:3000/api/games

Actualizar juego segun el id: PUT http://localhost:3000/api/games/id

Eliminar juego segun el id: DELETE http://localhost:3000/api/games/id