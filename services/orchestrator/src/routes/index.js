import express from 'express';
import systemRoutes from '../modules/system';
import orchestratorRoutes from '../modules/orchestrator';

const router = express.Router();

router.use(orchestratorRoutes);
router.use(systemRoutes);

export default router;