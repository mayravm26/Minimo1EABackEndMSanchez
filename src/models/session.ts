import { model, Schema,Types } from "mongoose";

export interface SessionInterface{
   user: Types.ObjectId,
   startTime:Date,
   endTime:Date,
   duracion: number,
    admin: boolean,
    disabled:boolean,
    timestamp:Date,
    activityDescription:string,
    isActive:boolean
}

const sessionSchema = new Schema<SessionInterface>({
    user:{type:Schema.Types.ObjectId, ref:'user', required:true},
    startTime:{type: Date,default:null},
    endTime:{type:Date,default:null},
    duracion:{type:Number,default:0},
    disabled:{type:Boolean, default:true},
    isActive: { type: Boolean, default: true },
    activityDescription: { type: String, default: 'No description' },
    timestamp: { type: Date, default: new Date() }


});

export const SessionModel = model<SessionInterface>('Session', sessionSchema);