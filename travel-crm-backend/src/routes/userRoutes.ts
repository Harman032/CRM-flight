import express from 'express';
import { getAgents } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Get agents is protected (available to both Admin and Agents)
router.get('/agents', protect, getAgents);

export default router;
