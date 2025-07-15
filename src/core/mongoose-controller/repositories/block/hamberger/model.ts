import { Schema, model } from "mongoose";
import Block, { blockSchema } from "../model";



export default interface Hamberger extends Block {
    
}

const hambergerSchema = new Schema(blockSchema)

export const HambergerModel = model<Hamberger>("hamberger" ,hambergerSchema)