import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getSchedules, addSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/', authMiddleware, getSchedules);
router.post('/', authMiddleware, addSchedule);
router.put('/:id', authMiddleware, updateSchedule);
router.delete('/:id', authMiddleware, deleteSchedule);

export default router;