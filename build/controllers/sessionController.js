"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUserSession = startUserSession;
exports.endUserSession = endUserSession;
exports.getUserSessions = getUserSessions;
const sessionServices = __importStar(require("../services/sessionServices"));
//creamos el controlador 
function startUserSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, activityDescription } = req.body;
            const newSession = yield sessionServices.createSession(userId, activityDescription);
            return res.status(201).json({ message: 'Sesión iniciada', session: newSession });
        }
        catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    });
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
function endUserSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sessionId } = req.body;
            const endedSession = yield sessionServices.endSession(sessionId);
            return res.status(200).json({ message: 'Sesión finalizada', session: endedSession });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
//historial 
function getUserSessions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const sessions = yield sessionServices.getUserSessions(userId);
            return res.status(200).json(sessions);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
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
