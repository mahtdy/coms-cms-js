import { Schema, model } from "mongoose";
import Block, { blockSchema } from "../model";

export default interface Navbar extends Block{
    
}

const navbarSchema = new Schema(blockSchema)

export const NavbarModel = model<Navbar>("navbar", navbarSchema)