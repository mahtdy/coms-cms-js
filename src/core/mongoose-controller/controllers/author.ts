import { BasePageController, basePageZod } from "../basePage/controller";
import BaseController, { ControllerOptions } from "../controller";
import Author, { AuthorModel } from "../repositories/author/model";
import AuthorRepository from "../repositories/author/repository";
import { z } from "zod"
import { styles } from "../style"

export var excelConfig = {
    name: {
        displayName: 'Name',
        headerStyle: styles.headerOdd,
        cellStyle: styles.cellOdd,
        width: 120,
    },
    family: {
        displayName: 'Family',
        headerStyle: styles.headerOdd,
        cellStyle: styles.cellOdd,
        width: 120,
    },
 
}

export var csvConfig = {
    fields: ['name', 'family'],
    fieldNames: ['Name', 'Family']
}

var pdfConfig = {
    path: "src/core/mongoose-controller/pdf.ejs",
    options: {
        "height": "90.25in",
        "width": "45.5in",
        "header": {
            "height": "20mm"
        },
        "footer": {
            "height": "20mm",
        },
        "childProcessOptions": {
            env: {
                OPENSSL_CONF: '/dev/null',
            },
        }
    },
    titles: ['Name', 'Family'],
    dataMap: ['name', 'family']
}
export class AuthorController extends BasePageController<Author>{
    constructor(baseRoute: string, repo: AuthorRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
    }
    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("/authores/search", "get",this.search.bind(this),BaseController.searcheMeta)
    }

    async  searchHelper(queryParam?: any): Promise<any> {
            
   
        let query: any = {}
        if (queryParam["info$reg"] ) {
            let qs = queryParam["info$reg"].split(" ")
            if (qs.length > 1) {
                query['$or'] = [
                    {
                        name: {
                            $regex: qs[0]
                        }
                    },
                    {
                        familyName: {
                            $regex: qs[1]
                        }
                    }
                ]
            }
            else {
                query['name'] = {
                    $regex: queryParam["info$reg"]
                }
            }

            delete  queryParam["info$reg"]
        }
        let q = await super.searchHelper(queryParam)
        query = Object.assign(q,query)
        return query

        
    }

}


var author = new AuthorController("/author", new AuthorRepository({
    model: AuthorModel,
    typeName: "author",
    contentFunc: async function (url: string, category: string, language?: string) {
        return "/author/" + url
    },
    selectData : {
        type: 1,
        title : 1,
        mainImage : 1,
        author : 1,
        category: 1,
        publishDate: 1,
        insertDate: 1
    },
    sort :{
        "publishDate" :{
            show : "زمان انتشار"
        },
        "insertDate" :{
            show : "زمان انتشار"
        },
        "view" :{
            show : "بازدید"
        }
    }
}), {
    insertSchema: z.object({
        name: z.string(),
        family: z.string(),
        biography: z.string(),
        image: z.string()
    }).merge(basePageZod),
    searchFilters:{
        name :["reg"],
        family :["reg"],
        id :["eq"],
        info : ["reg"]
    },
    pdfConfig,
    excelConfig,
    csvConfig
})

export default  author