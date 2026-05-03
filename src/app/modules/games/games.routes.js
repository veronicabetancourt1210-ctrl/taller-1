import { Router } from 'express';
import { createJuego, getJuegos, getJuego, updateJuego, deleteJuego } from './games.controller.js';

const router = Router();

router.post('/', createJuego);        // POST para crear
router.get('/', getJuegos);           // GET para todos
router.get('/:id', getJuego);         // GET para uno específico
router.put('/:id', updateJuego);      // PUT para actualizar
router.delete('/:id', deleteJuego);   // DELETE para borrar

export default router;
