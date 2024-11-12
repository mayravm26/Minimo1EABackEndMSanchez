"use strict";
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
exports.createSession = createSession;
exports.endSession = endSession;
exports.getUserSessions = getUserSessions;
const user_1 = require("../models/user");
const session_1 = require("../models/session");
// Crear una nueva sesión para un usuario
function createSession(userId, activityDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.userofDB.findById(userId);
        if (!user) {
            throw new Error('usuario no encontrado');
        }
        const newSession = new session_1.SessionModel({ user: userId, startTime: new Date(), isActive: true, disabled: false, activityDescription, timestamp: new Date() });
        yield newSession.save();
        return newSession;
    });
}
//Fin session
function endSession(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield session_1.SessionModel.findById(sessionId);
        if (!session || !session.isActive) {
            throw new Error('Sesión no encontrada o ya finalizada');
        }
        session.endTime = new Date();
        session.duracion = (session.endTime.getTime() - session.startTime.getTime()) / 1000; // Duración en segundos
        session.isActive = false;
        yield session.save();
        return session;
    });
}
//historial
function getUserSessions(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield session_1.SessionModel.find({ user: userId }).populate('user');
    });
}
