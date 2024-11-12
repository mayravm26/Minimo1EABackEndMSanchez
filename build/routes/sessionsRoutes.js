"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionController_1 = require("../controllers/sessionController");
const sessionsRoutes = express_1.default.Router();
// para la nueva session de usuario CRUD
sessionsRoutes.post('/iniciosession', sessionController_1.startUserSession);
sessionsRoutes.post('/finsession', sessionController_1.endUserSession);
sessionsRoutes.get('/userId', sessionController_1.getUserSessions);
exports.default = sessionsRoutes;
