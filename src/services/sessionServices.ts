import { userofDB } from '../models/user'
import { SessionModel } from '../models/session';

// Crear una nueva sesión para un usuario
export async function createSession(userId: string, activityDescription:string) {
    const user= await userofDB.findById(userId);
    if (!user)
    {
        throw new Error('usuario no encontrado');
    }
    const newSession = new SessionModel({ user: userId, startTime: new Date(), isActive: true , disabled:false,activityDescription,timestamp:new Date()});
    await newSession.save();
    return newSession;
}

//Fin session
export async function endSession(sessionId: string) {
    const session = await SessionModel.findById(sessionId);
    if (!session || !session.isActive) {
        throw new Error('Sesión no encontrada o ya finalizada');
    }

    session.endTime = new Date();
    session.duracion = (session.endTime.getTime() - session.startTime.getTime()) / 1000; // Duración en segundos
    session.isActive = false;
    await session.save();
    return session;
}

//historial
export async function getUserSessions(userId: string) {
    return await SessionModel.find({ user: userId }).populate('user');
}