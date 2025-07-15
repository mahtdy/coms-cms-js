import { Model, Types } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Block, { DataMap } from "./model";
import BlockExportRepository from "./blockExport/repository";
import { DiskFileManager } from "../../../services/fileManager";
import Terminal from "../../../services/terminal";
import path from "path";
import fs from "fs"
import ConfigService from "../../../services/config";
import RandomGenarator from "../../../random";
interface BlockRegistery {
    [key: string]: BlockRepository<Block>
}

let blockRegistery: BlockRegistery = {
}

interface ChildMeta {
    key?: string
}
const exportRepo = new BlockExportRepository()
export default class BlockRepository<T extends Block> extends BaseRepositoryService<T>{
    exportRepo = exportRepo
    constructor(model: Model<T>, name: string, options?: RepositoryConfigOptions) {
        super(model, options)
        // console.log(model.collection.name)
        if (!blockRegistery[name]) {
            blockRegistery[name] = this as any
        }
    }

    insert(document: T, options?: any): Promise<any> {
        document.childComponents = this.findChildComponent(document.dataMap)
        return super.insert(document, options)
    }

    findChildComponent(list: DataMap[], parentKey: string = "") {
        let childs: any[] = []
        for (let i = 0; i < list.length; i++) {
            if (list[i].type == "component") {
                childs.push({
                    path: parentKey + list[i].key,
                    componentType: list[i].componentType
                })
            }
            else if (list[i].type == "array") {
                if (list[i].arrayType == "object") {
                    childs.push(...this.findChildComponent(list[i].children || [], parentKey + list[i].key + "$."))
                }
            }
            else if (list[i].type == "object") {
                childs.push(...this.findChildComponent(list[i].children || [], parentKey + list[i].key + "."))
            }

        }
        return childs
    }


    fetchData(data: any, keys: string[]) {
        let result: any[] = []
        if (keys.length == 0) {
            return []
        }
        let key = keys.shift() as string
        if (key.includes("$")) {
            key = key.replace("$", "")
            if (data[key] == undefined || data[key] == null) {
                return []
            }

            if (keys.length == 0) {
                for (let i = 0; i < data[key].length; i++) {
                    let config = data[key][i]
                    config['CName'] = config['name']
                    config['name'] = config['name'] + "_" +RandomGenarator.generateHashStr(3)
                    result.push(data[key][i])
                }
            }
            else {
                for (let i = 0; i < data[key].length; i++) {
                    result.push(...this.fetchData(data[key][i], [...keys]))
                }
            }
        }
        else {
            if (data[key] == undefined || data[key] == null) {
                return []
            }
            if (keys.length == 0) {
                // console.log(data[key], "tt")
                // console.log("")
                // data[key]['']
                let config = data[key]
                config['CName'] = config['name']
                config['name'] = config['name'] + "_" +RandomGenarator.generateHashStr(3)
                result.push(config)

            }
            else {
                result.push(...this.fetchData(data[key], [...keys]))
            }
        }
        return result
    }

    async exportJSX(id: string, config: any, folder?: string): Promise<any> {
        try {


            // retur}
            let block = await this.findById(id)
            if (block == null)
                return

            let blockName = block.name
            console.log("folder" , folder)
            if (!folder) {
                let isExists = await DiskFileManager.isExists("../client-stage/src/app/" + blockName + "/")


                let newID = new Types.ObjectId()
                if (!isExists) {
                    await DiskFileManager.mkdir("../client-stage/src/app/", blockName)
                }

                await DiskFileManager.mkdir(`../client-stage/src/app/${blockName}/`, newID.toHexString())

                folder = `../client-stage/src/app/${blockName}/${newID.toHexString()}/`

                await DiskFileManager
                    .copy(block.tsx, folder)
                await DiskFileManager
                    .copy(block.css, folder)

                let cName = blockName.charAt(0).toUpperCase() + blockName.slice(1)
                await this.replaceCSS(`${folder}${path.basename(block.tsx)}`, block.css)
        

                if (block.childComponents?.length > 0) {
                    for (let i = 0; i < block.childComponents.length; i++) {
                        let keys = block.childComponents[i].path.split(".")
                        var result = this.fetchData(config, keys)
                        var registry = blockRegistery[block.childComponents[i].componentType]
                        // console.log("result" , result)
                        for (let j = 0; j < result.length; j++) {
                            var re = await registry.findOne({
                                name: result[j].CName
                            })
                            
                            let childName = result[j].name
                            await DiskFileManager.mkdir(folder,result[j].name  )
                            console.log(result[j],re)
                            await registry.exportJSX(re?._id ,result[j].data,folder+result[j].name +"/" )
                            await this.addImport(folder+path.basename( block.tsx),`./${childName}/${path.basename(re?.tsx || "").replace(".tsx", "")}`, childName,result[j].data )
                            console.log(result[j].name, re)

                        }
                    }
                }

                await DiskFileManager.writeFile(`${folder}page.tsx`, `
                import Image from 'next/image'
                import ${cName} from "./${path.basename(block.tsx.replace(".tsx", ""))}"
                    export default function ${cName}_Page() {
                        let data= ${JSON.stringify(config)}
                    return (
                        <${cName} data ={data}>

                        </${cName}>
                    )
                }
               `)



                // return await this.exportRepo.insert({
                //     type: this.collection.name,
                //     url: ConfigService.getConfig("stage-server") + blockName + "/" + newID.toHexString(),
                //     file: `${folder}${path.basename(block.tsx)}`,
                //     json: config,
                //     css: `${folder}${path.basename(block.css)}`,
                //     _id: newID
                // } as any)


            }

            else{

                await DiskFileManager
                    .copy(block.tsx, folder)
                await DiskFileManager
                    .copy(block.css, folder)

                await this.replaceCSS(`${folder}${path.basename(block.tsx)}`, block.css)

                if (block.childComponents?.length > 0) {
                    for (let i = 0; i < block.childComponents.length; i++) {
                        let keys = block.childComponents[i].path.split(".")
                        var result = this.fetchData(config, keys)
                        var registry = blockRegistery[block.childComponents[i].componentType]
                        // console.log("result" , result)
                        for (let j = 0; j < result.length; j++) {
                            var re = await registry.findOne({
                                name: result[j].name
                            })
                            
                            let cName = result[j].name
                            await DiskFileManager.mkdir(folder,cName  )
                            await registry.exportJSX(re?._id ,result[j].data,folder+"/"+cName+"/" )
                            await this.addImport(folder+path.basename( block.tsx),`./${cName}/${path.basename(re?.tsx || "").replace(".tsx", "")}`, cName,result[j].data )
                            console.log(result[j].name, re)

                        }
                    }
                }
            }


            // 'list$.component'
            // if (block.childComponents.length > 0) {
            //     for (let i = 0; i < block.childComponents.length; i++) {
            //         let keys = block.childComponents[i].path.split(".")
            //         var result = this.fetchData(config, keys)
            //         console.log("result", result, block.childComponents[i].componentType)
            //         var registry = blockRegistery[block.childComponents[i].componentType]
            //         for (let j = 0; j < result.length; j++) {
            //             var re = await registry.findOne({
            //                 name: result[j].name
            //             })
            //             console.log(result[j].name, re)
            //         }
            //         // const element = array[i];
            //         // let data = blockRegistery[blockRegistery[i]]
            //         // console.log(block.childComponents[i])
            //         // console.log(block.childComponents[i].componentType)

            //     }
            // }




            return

            // let name = block.name
            // let isExists = await DiskFileManager.isExists("../client-stage/src/app/" + name + "/")

            // let componentName = name.charAt(0).toUpperCase() + name.slice(1)
            // let newID = new Types.ObjectId()
            // if (!isExists) {
            //     await DiskFileManager.mkdir("../client-stage/src/app/", name)
            // }

            // await DiskFileManager.mkdir(`../client-stage/src/app/${name}/`, newID.toHexString())

            // await DiskFileManager
            //     .copy(block.tsx, `../client-stage/src/app/${name}/${newID.toHexString()}/`)
            // await DiskFileManager
            //     .copy(block.css, `../client-stage/src/app/${name}/${newID.toHexString()}/`)

            // list$.component
            // if (block.childComponents.length > 0) {
            //     for (let i = 0; i < block.childComponents.length; i++) {
            //         // const element = array[i];
            //         // let data = blockRegistery[blockRegistery[i]]
            //         console.l
            //     }
            // }

            // await this.replaceCSS(`../client-stage/src/app/${name}/${newID.toHexString()}/${path.basename(block.tsx)}`, block.css)
            // await DiskFileManager.writeFile(`../client-stage/src/app/${name}/${newID.toHexString()}/page.tsx`, `
            //     import Image from 'next/image'
            //     import ${componentName} from "./${path.basename(block.tsx.replace(".tsx", ""))}"
            //         export default function ${componentName}_Page() {
            //             let data= ${JSON.stringify(config)}
            //         return (
            //             <${componentName} data ={data}>

            //             </${componentName}>
            //         )
            //         }
                
            //     `)


            // await DiskFileManager.copy(block?.tsx, "../client-stage/src/")
            // // await Terminal.execute("cd frontend/stage && tsc")
            // let exported = await DiskFileManager.copy("frontend/stage/jsx/" + path.basename(block?.tsx).replace("tsx", "jsx"), "src/frontend/exported/")
            // await DiskFileManager.removeFolderFiles("frontend/stage/tsx/")
            // await DiskFileManager.removeFolderFiles("frontend/stage/jsx/")


            // let css = await DiskFileManager.copy(block.css, "src/frontend/exported/")
            // await this.addCSSToFile(exported, css)
            // await this.addReactRequire(exported)
            // return this.exportRepo.insert({
            //     type: this.collection.name,
            //     url: ConfigService.getConfig("stage-server") + name + "/" + newID.toHexString(),
            //     file: `../client-stage/src/app/${name}/${newID.toHexString()}/${path.basename(block.tsx)}`,
            //     json: config,
            //     css: `../client-stage/src/app/${name}/${newID.toHexString()}/${path.basename(block.css)}`,
            //     _id: newID
            // } as any)

        }
        catch (error) {
            console.log("err", error)
            throw error
        }
    }


    async addImport(targetPath : string,filePath :string,cName : string , data : any){

       let ConmponentName = cName.charAt(0).toUpperCase() + cName.slice(1) 

        let lines = fs.readFileSync(targetPath, 'utf-8').split('\n')
        lines.unshift(`import ${ConmponentName} from "${filePath}"`)
        let dataName= RandomGenarator.generateHashStr(4)
        lines.push(`let ${dataName} = ${JSON.stringify(data)} `)
        lines.push(`components["${cName}"] =  <${ConmponentName} data= {${dataName}}></${ConmponentName}>`)
        fs.writeFileSync(targetPath, lines.join("\n"))
    }

    async getExported(id: string) {
        return this.exportRepo.findById(id)
    }


    async addReactRequire(file: string) {
        let lines = fs.readFileSync(file, 'utf-8').split('\n')
        lines.unshift('var React = require("react")')

        fs.writeFileSync(file, lines.join("\n"))
    }

    async replaceCSS(file: string, name: string) {
        let lines = fs.readFileSync(file, 'utf-8').split('\n')
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('.css')) {
                lines[i] = `import "./${path.basename(name)}"`
                // lines.push
            }
            if (lines[i].includes("return (")) {
                lines[i - 1] = "data = data.data"
            }

        }

        fs.writeFileSync(file, lines.join("\n"))
    }

    async addCSSToFile(file: string, css: string) {
        // console.log(file)
        let lines = fs.readFileSync(file, 'utf-8').split('\n')
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('.css')) {

                console.log(i, lines[i])
                lines[i] = "//" + lines[i]
            }
        }

        fs.writeFileSync(file, lines.join("\n"))
        // console.log(lines)
    }
}

