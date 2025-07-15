import { Schema, model } from "mongoose";
import Block, { blockSchema } from "../model";



export default interface Menu extends Block {
    type : "mega" | "waterfall"
}

const menuSchema = new Schema(
    Object.assign(
        blockSchema, {
            type : {
                type : String ,
                enum : ["mega" , "waterfall"]
            }
        }
    )
)


export const MenuModel = model<Menu>("menu" ,menuSchema)

