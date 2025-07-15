import BaseController from "../controller";
import DBSchema from "../repositories/dbSchema/model";
import DBSchemaRepository from "../repositories/dbSchema/repository";
import z from "zod"



export class DBSchemaController extends BaseController<DBSchema>{

}

const dbSchema = new DBSchemaController("/dbSchema", new DBSchemaRepository(),
    {
        insertSchema: z.object({
            collectionName: z.string(),
            collectionSchema:  z.record(z.string(), z.object({
                sub: BaseController.search.optional(),
                visible: z.enum(["0", "1", "2"]),
                persianName : z.string(),
                canEdit : z.boolean().default(false)
            })),
            persianName: z.string(),
            subPart: z.string()
        })
    })

export default dbSchema
