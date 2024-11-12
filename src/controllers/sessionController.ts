import { Request, Response } from "express";
import * as sessionServices from '../services/sessionServices';


//creamos el controlador 

export async function startUserSession(req: Request, res: Response): Promise<Response> {
    try {
        const { userId , activityDescription} = req.body;
        const newSession = await sessionServices.createSession(userId, activityDescription);
        return res.status(201).json({ message: 'Sesión iniciada', session: newSession });
       
    } catch (error: any) {
        console.error('Error al iniciar sesión:', error.message);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}


/*/ fin de la session 
export async function endUserSession(req: Request, res: Response): Promise<Response> {
    try {
        const { sessionId } = req.body;
        const session = await SessionModel.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Sesión no encontrada' });
        }

        session.endTime = new Date();
        session.duracion = (session.endTime.getTime() - session.startTime.getTime()) / 1000;
        session.disabled = false;
        await session.save();

        return res.status(200).json({ message: 'Sesión finalizada', session });
    } catch (error: any) {
        console.error("Error al finalizar la sesión:", error.message);
        return res.status(500).json({ error: 'No se puede cerrar la sesión' });
    }
}
*/

export async function endUserSession(req: Request, res: Response): Promise<Response> {
    try {
        const { sessionId } = req.body;
        const endedSession = await sessionServices.endSession(sessionId);
        return res.status(200).json({ message: 'Sesión finalizada', session: endedSession });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

//historial 
export async function getUserSessions(req: Request, res: Response): Promise<Response> {
    try {
        const { userId } = req.params;
        const sessions = await sessionServices.getUserSessions(userId);
        return res.status(200).json(sessions);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}




/*
//Historial de sessiones 
export async function getUserSessions(req: Request, res: Response): Promise<Response> {
    try {
        const { userId } = req.params;
        const sessions = await SessionModel.find({ user: userId }).populate('user');
        if (!sessions) {
            return res.status(404).json({ message: 'No se encontraron sesiones para este usuario' });
        }
        return res.status(200).json(sessions);
    } catch (error: any) {
        console.error("Error al obtener las sesiones del usuario:", error.message);
        return res.status(500).json({ error: 'Error al obtener las sesiones del usuario' });
    }
}
*/
