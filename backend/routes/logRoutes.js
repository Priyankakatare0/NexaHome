import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getLogs, addLog } from '../controllers/logController.js';

const router = express.Router();

router.get('/', authMiddleware, getLogs);
router.post('/', authMiddleware, addLog);

export default router;