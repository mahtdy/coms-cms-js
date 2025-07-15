import { Body, Param, Query } from "../../../core/decorators/parameters";
import Controller, { Response } from "../../../core/controller";
import {  noteSchema } from "./dto";
import { z } from "zod"
import { Get, Post } from "../../../core/decorators/method";
class NoteController extends Controller {
    notes: string[]
    constructor(baseRoute: string) {
        super(baseRoute)
        this.notes = []
    }

    @Post("/", {
        contentType : "multipart/form-data"
    })
    addNote(@Body({
        schema: noteSchema
    }) note: any): Response {
        this.notes.push(note.title)
        return {
            status: 200,
            data: {}
        }
    }

    @Get("s")
    getNotes(@Query({
        destination: "name",
        schema: z.string()
    }) note: string): Response {
        return {
            status: 200,
            data: this.notes
        }
    }

    @Get("")
    getNote(
    @Query({
        destination: "name",
        schema: z.string()
    }) note: string ,
     
    @Param({
        destination: "ss",
        schema: z.string()
    }) ss: string
    
    ): Response {
        return {
            status: 200,
            data: this.notes
        }
    }
}
var noteController = new NoteController("/note")

noteController.loginRequired = true



// noteController.addRoute("/",
//     "post",
//     noteController.addNote.bind(noteController))

// noteController.addRoute("s",
//     "get",
//     noteController.getNotes.bind(noteController))

// noteController.addRoute("",
//     "get",
//     noteController.getNote.bind(noteController))


export default noteController

