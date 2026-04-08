import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getDevices, addDevice, toggleDevice, deleteDevice } from '../controllers/deviceController.js';

const router = express.Router();

router.get('/', authMiddleware, getDevices);
router.post('/', authMiddleware, addDevice);
router.put('/:id/toggle', authMiddleware, toggleDevice);
router.delete('/:id', authMiddleware, deleteDevice);

export default router;
