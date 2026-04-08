import express from 'express';
import {
  getCredentials,
  createCredential,
  getFullCredential,
  revokeCredential,
  deleteCredential,
  validateApiKey
} from '../controllers/credentialController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public endpoint - validate API key (for device authentication)
// This doesn't require user authentication
router.post('/validate', validateApiKey);

// All routes below require authentication
router.use(authMiddleware);

// Get all credentials for user
router.get('/', getCredentials);

// Create new credential
router.post('/', createCredential);

// Get full credential details (requires auth)
router.get('/:id', getFullCredential);

// Revoke credential (deactivate without deleting)
router.put('/:id/revoke', revokeCredential);

// Delete credential permanently
router.delete('/:id', deleteCredential);

export default router;
