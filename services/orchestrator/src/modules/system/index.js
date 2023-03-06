import express from 'express';
import apiV1Routes from './api/v1/controller';

const router = express.Router();

const modulePrefix = 'system';

router.use(`/v1/${modulePrefix}`, apiV1Routes);

export default router;