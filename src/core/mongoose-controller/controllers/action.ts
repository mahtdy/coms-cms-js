import { Body } from "../../decorators/parameters"
import { Get, Post } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import Action from "../repositories/action/model";
import ActionRepository from "../repositories/action/repository";
import z from "zod"
import { Response } from "../../controller";

const zodAction = z.object({
    title: z.string(),
    url: z.string(),
    method: z.enum(["POST", "GET", "DELETE", "PUT"]),
    description: z.string().optional(),
    partName: z.string(),
    partPersion: z.string(),
    subPartName: z.string().optional(),
    subPartPersion: z.string().optional(),
    isMainGet: z.boolean().optional()
})


export class ActionController extends BaseController<Action>{
    additionActions : any
    constructor(baseRoute : string,repo : ActionRepository,options: ControllerOptions
        & {
            additionActions : any
        }
        ){
        super(baseRoute,repo,options)
        this.additionActions = options.additionActions
    }

    @Post("es")
    async insertMany(@Body({
        schema: z.array(zodAction)
    }) actions: Action[]): Promise<Response> {
        return super.insertMany(actions)
    }


    @Get("es/sorted")
    async getSorted(): Promise<Response>{
        try {
            var data = await this.repository.getSorted()
            var responseData : any = {}
            for (let i = 0; i < data.length; i++) {
                let nestedData:any = {}
                for (let j = 0; j < data[i].sub.length; j++) {
                    nestedData[data[i].sub[j]['subPartName']] = {
                        "persianName"  : data[i].sub[j]['subPartPersion']
                    }
                }
                responseData[data[i]['_id']] = {
                    "persianName"  : data[i]['persianName'],
                    sub : nestedData
                }
            }
            return {
                status : 200,
                data :Object.assign(responseData,this.additionActions)
            }
        } catch (error) {
            throw error
        }
      
    }
}

const action = new ActionController("/action", new ActionRepository(), {
    insertSchema: zodAction,
    additionActions : {
        systemConfig: {
            "persianName": "تنظیمات",
            "sub": {
              "fileManagerConfig": {
                "persianName": "مدیریت فایل منیجر"
              },
              "SMSConfig": {
                "persianName": "مدیریت درگاه‌های پیامکی"
              },
              "emailConfig": {
                "persianName": "مدیریت درگاه‌های ایمیل"
              },
              "payPortConfig": {
                "persianName": "‌مدیریت درگاه‌های پرداخت"
              },
              "bankAccount": {
                "persianName": "مدیریت حساب های بانکی"
              }

            }
          },
        contentModule: {
            "persianName": "بخش محتوا",
            "sub" : {
                content : {
                    "persianName": "مدیریت مقالات"
                }
            }
        }
    }
})

export default action