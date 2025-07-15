import { Schema ,Types, model} from "mongoose";
import Block from "../model";
import Navbar from "../navbar/model";



export default interface Header extends Block{
    // navbar : Navbar
}

const headerSchema = new Schema({
    // navbar : {
    //     type: Types.ObjectId,
    //     required : true,
        
    // }
})


export const HeaderModel = model<Header>("header" , headerSchema)