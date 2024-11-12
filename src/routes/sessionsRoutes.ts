
import express from 'express';
import { startUserSession, endUserSession, getUserSessions } from '../controllers/sessionController';


const sessionsRoutes = express.Router();
// para la nueva session de usuario CRUD

sessionsRoutes.post('/iniciosession',startUserSession);
sessionsRoutes.post('/finsession',endUserSession);
sessionsRoutes.get('/userId',getUserSessions);

export default sessionsRoutes;

