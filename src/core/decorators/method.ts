import "reflect-metadata"
import Controller from "../controller";



interface PostOptions {
    contentType?: "application/json" | "application/xml" | "application/x-www-form-urlencoded" | "multipart/form-data",
    loginRequired?: boolean,
    absolute?: boolean ,
    apiDoc? :any,
    preExecs ?: Function[]
}
export function Post(path: string, options?: PostOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // var self : Controller = this
        
        var classConf: any = Reflect.getMetadata("routes" +target.constructor.name, target) || {}
        if (!classConf.routes) {
            classConf.routes = []
        }
        classConf.routes.push({
            method: "post",
            route: path,
            execs: descriptor.value,
            absolute : options?.absolute,
            loginRequired : options?.loginRequired,
            apiDoc: options?.apiDoc,
            preExecs: options?.preExecs
        })
        Reflect.defineMetadata("routes" + target.constructor.name, classConf, target)

        var confs: any = Reflect.getMetadata(propertyKey+target.constructor.name, target) || {}



        if (options?.loginRequired) {
            confs['loginRequired'] = true
        }

        if (options?.contentType) {
            // console.log(descriptor.value.name )
            confs['contentType'] = options.contentType
        }

        Reflect.defineMetadata(propertyKey+ target.constructor.name, confs, target)

        return descriptor; 
    };
}

interface GetOptions {
    loginRequired?: boolean,
    absolute?: boolean,
    apiDoc? :any,
    preExecs ?: Function[]
}
export function Get(path: string, options?: GetOptions) {
   
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if(path == "/draft"){
            console.log(target , propertyKey)
        }
        var classConf: any = Reflect.getMetadata("routes" +target.constructor.name, target) || {}
        if (!classConf.routes) {
            classConf.routes = []
            
        }
        classConf.routes.push({
            method: "get",
            route: path,
            execs: descriptor.value,
            absolute : options?.absolute,
            loginRequired : options?.loginRequired,
            apiDoc : options?.apiDoc,
            preExecs : options?.preExecs
        })
        Reflect.defineMetadata("routes" + target.constructor.name, classConf, target)

        var confs: any = Reflect.getMetadata(propertyKey+target.constructor.name, target) || {}

        if (options?.loginRequired) {
            confs['loginRequired'] = true
        }

        Reflect.defineMetadata(propertyKey +target.constructor.name, confs, target)
        return descriptor; 
    };
}


interface PreExecOptions {
    loginRequired?: boolean,
    route : string,
    method : "post" | "put" | "delete" | "get" 
}
export function PreExec( options: PreExecOptions) {
   
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var classConf: any = Reflect.getMetadata("routes" +target.constructor.name, target) || {}
       

        if (!classConf.preExecs) {
            classConf.preExecs = []
            
        }
        classConf.preExecs.push({
            method: options.method,
            route: options.route,
            execs: descriptor.value,
        })
        Reflect.defineMetadata("routes" + target.constructor.name, classConf, target)

        var confs: any = Reflect.getMetadata(propertyKey+target.constructor.name, target) || {}

        if (options?.loginRequired) {
            confs['loginRequired'] = true
        }

        Reflect.defineMetadata(propertyKey +target.constructor.name, confs, target)
        return descriptor; 
    };
}

interface DeleteOptions {
    contentType?: "application/json" | "application/xml" | "application/x-www-form-urlencoded" | "multipart/form-data",
    loginRequired?: boolean,
    absolute ?: boolean,
    apiDoc ?: any,
    preExecs ?: Function[]
}
export function Delete(path: string, options?: DeleteOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var classConf: any = Reflect.getMetadata("routes" +target.constructor.name, target) || {}
        if (!classConf.routes) {
            classConf.routes = []
        }
        classConf.routes.push({
            method: "delete",
            route: path,
            execs: descriptor.value,
            absolute : options?.absolute,
            loginRequired : options?.loginRequired,
            apiDoc : options?.apiDoc,
            preExecs : options?.preExecs
        })
        Reflect.defineMetadata("routes" + target.constructor.name, classConf, target)

        var confs: any = Reflect.getMetadata(propertyKey+target.constructor.name, target) || {}

        if (options?.loginRequired) {
            confs['loginRequired'] = true
        }

        if (options?.contentType) {
            confs['contentType'] = options.contentType
        }

        Reflect.defineMetadata(propertyKey +target.constructor.name, confs, target)
        return descriptor; 
    };
}

interface PutOptions {
    contentType?: "application/json" | "application/xml" | "application/x-www-form-urlencoded" | "multipart/form-data",
    loginRequired?: boolean,
    absolute ?: boolean,
    apiDoc ?: any,
    preExecs ?: Function[]
}
export function Put(path: string, options?: PutOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var classConf: any = Reflect.getMetadata("routes" +target.constructor.name, target) || {}
        if (!classConf.routes) {
            classConf.routes = []
        }
        classConf.routes.push({
            method: "put",
            route: path,
            execs: descriptor.value,
            absolute : options?.absolute,
            loginRequired : options?.loginRequired,
            apiDoc : options?.apiDoc,
            preExecs : options?.preExecs
        })
        Reflect.defineMetadata("routes"+ target.constructor.name, classConf, target)

        var confs: any = Reflect.getMetadata(propertyKey+target.constructor.name, target) || {}

        if (options?.loginRequired) {
            confs['loginRequired'] = true
        }

        if (options?.contentType) {
            confs['contentType'] = options.contentType
        }
        Reflect.defineMetadata(propertyKey+target.constructor.name, confs, target)
        return descriptor; 
    };
}


export function Middleware(func: Function | Function[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // self.addRoute(path, "post",descriptor.value.bind(self))
        var classConf: any = Reflect.getMetadata("middlewares", target) || {}
        if (!classConf[propertyKey]) {
            classConf[propertyKey] = [] as Function[]
        }
        typeof func == "function" ? classConf[propertyKey].push(func) : classConf[propertyKey].push(...func)
        Reflect.defineMetadata("middlewares", classConf, target)

    };
}
export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // self.addRoute(path, "post",descriptor.value.bind(self))
    var classConf: any = Reflect.getMetadata("logRoutes", target) || {}
    if (!classConf[propertyKey]) {
        classConf[propertyKey] = true
    }
    Reflect.defineMetadata("logRoutes", classConf, target)

};
