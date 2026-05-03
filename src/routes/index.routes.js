import { Router } from 'express';
import gamesRoutes from '../app/modules/games/games.routes.js';

const router = Router();


router.use('/games', gamesRoutes);

export default router;