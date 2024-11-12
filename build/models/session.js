"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    duracion: { type: Number, default: 0 },
    disabled: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    activityDescription: { type: String, default: 'No description' },
    timestamp: { type: Date, default: new Date() }
});
exports.SessionModel = (0, mongoose_1.model)('Session', sessionSchema);
