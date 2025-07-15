
import FileUses, { FileUsesModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class FileUsesRepository extends BaseRepositoryService<FileUses> {
    constructor(options? :RepositoryConfigOptions) {
        super(FileUsesModel, options)
    }

    public async makeChangeFileUses(id: string, files: string[],source: string ){   
        try {
            await this.deleteMany({
                file : {
                    $nin : files
                },
                useType : "inside",
                data : id
            })
            var newFiles : any[] = files.map((elem: string) =>{
                return {
                    file : elem,
                    useType : "inside",
                    data : id,
                    source
                }
            })
            let res= await this.insertMany(newFiles)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}      
