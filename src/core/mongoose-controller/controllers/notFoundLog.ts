import { Body } from "../../decorators/parameters";
import { Post } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import NotFoundLog from "../repositories/notFoundLog/model";
import NotFoundLogRepository from "../repositories/notFoundLog/repository";
import {z} from "zod"
import { Response } from "../../controller";
import { styles } from "../style";


export class NotFoundLogController extends BaseController<NotFoundLog>{
    constructor(baseRoute : string,repo : NotFoundLogRepository, options? :ControllerOptions){
        super(baseRoute, repo , options)
    }

    @Post("/redirect")
    async addRedirect(
        @Body({
            destination : "from",
            schema : z.string()
        }) from : string,
        @Body({
            destination : "to",
            schema : z.string()
        }) to : string
    ) :Promise<Response>{
        return {

        }

    }

    initApis(): void {
        this.addRouteWithMeta("es", "get", this.paginate.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "page",
                schema: BaseController.page
            },
            "2": {
                index: 1,
                source: "query",
                destination: "limit",
                schema: BaseController.limit
            },
        })

        this.addRoute("s/exel", "get", this.exportExcel.bind(this))
        this.addRoute("s/csv", "get", this.exportCSV.bind(this))
        this.addRoute("s/pdf", "get", this.exportPDF.bind(this))
    }
}

var excelConfig = {
    url: {
        displayName: 'URL',
        headerStyle: styles.headerOdd,
        cellFormat: function (value: any, row: any) {
            return decodeURI(value)
        },
        width: 120,
    },
    lastDate: {
        displayName: 'Last Date',
        headerStyle: styles.headerEven,
        cellStyle: styles.cellOdd,
        width: 60,
    },
    count: {
        displayName: 'Count',
        headerStyle: styles.headerOdd,
        cellStyle: styles.cellOdd,
        width: 120,
    },
 
}

var csvConfig = {
    fields: ['url', 'lastDate', 'count'],
    fieldNames: ['URL', 'Last Date', 'Count']
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
    titles:  ['URL', 'Last Date', 'Count'],
    dataMap: ['url', 'lastDate', 'count']
}

var notFoundLog = new NotFoundLogController("/notFoundLog", new NotFoundLogRepository() , {
    excelConfig,
    csvConfig,
    pdfConfig
})
export default notFoundLog
