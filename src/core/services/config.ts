import configs from  "../../config"

export default class ConfigService{
    
    static getConfig(name : string){
        
        return (configs as any)[name]
    }
}
