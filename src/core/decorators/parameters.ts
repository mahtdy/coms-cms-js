import "reflect-metadata"
import { ZodSchema } from "zod";
export function POST(str: string) {

    return (target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        propertyDescriptor = propertyDescriptor;
        const originalMethod = propertyDescriptor.value;
        propertyDescriptor.value = async function (...args: any[]) {
            try {
                var result = await originalMethod.apply(this, args);

                return result;
            } catch (err) {
                throw err;
            }
        };
        return propertyDescriptor;
    }
}

export interface RouteMeta {
    [key: string]: {
        source: "body" | "param" | "query" | "files" | "req" | "res" | "next" | "session" | "ip" | "user" | "header" | "admin" | "fromOwn", 
        destination?: string,
        schema: ZodSchema,
        parseJson?: boolean,
        isArray?: boolean
        required?: boolean,
        data ?:any
    }
}

export interface ControllerMeta {
    params?: RouteMeta
}

export interface MetaConf {
    destination?: string,
    source: "body" | "param" | "query" | "files" | "req" | "res" | "next" | "session" | "ip" | "header" | "admin" | "user" | "fromReq",
    index: number,
    schema?: ZodSchema,
    parseJson?: boolean,
    isArray?: boolean,
    exclude?: string[]
    config?: any,
    required?: boolean
    mapToBody?: boolean,
}

export function setMeta(meta: MetaConf, confs: any) {
    if (!confs["params"]) {
        confs.params = {}
    }
    if (meta.source == "files") {
        if (!confs.files) {
            confs.files = []
        }
        confs.files.push(meta.config)
    }
    confs['params'][meta.index + 1] = {
        "source": meta.source,
        "destination": meta.destination,
        "schema": meta.schema,
        "config": meta.config,
        "parseJson": meta.parseJson,
        "isArray": meta.isArray,
        "required": meta.required
    }

    return confs
}

interface ParamDecoratorOption {
    schema?: ZodSchema,
    destination?: string,
    exclude?: string[],
    parseJson?: boolean,
    isArray?: boolean
}


export function Body(options: ParamDecoratorOption) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: ControllerMeta = getMeta(propertyKey, target)
        // console.log(options.parseJson)
        confs = setMeta({
            index: parameterIndex,
            source: "body",
            destination: options.destination,
            schema: options.schema,
            exclude: options.exclude,
            parseJson: options.parseJson,
            isArray: options.isArray
        }, confs)
        defineMeta(propertyKey, confs, target)
    }
}

interface UploadConfig {
    name: string,
    types?: string[] | string,
    size?: number,
    maxCount: number,
    rename?: boolean,
    dest?: string
}

export function Files(options: ParamDecoratorOption & {
    config?: UploadConfig,
    mapToBody?: boolean,
    moveFilesToCDN?: {
        name: string | string[]
        config?: {
            path?: string | Function,
            server?: string,
            customServer?: {
                type: "objectStorage" | "ftp",
                config: any,
                hostUrl: string,
                id: string
            } | Function,
            uploadWithState?: boolean
        }
    },
    skip?: boolean,
    isOptional?: boolean
}) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: ControllerMeta = getMeta(propertyKey, target)
        confs = setMeta({
            index: parameterIndex,
            source: "files",
            "config": Object.assign(options.config || {}, { "mapToBody": options.mapToBody, "moveFilesToCDN": options.moveFilesToCDN, "isOptional": options.isOptional, "skip": options.skip }),
            destination: options.destination,
            schema: options.schema
        }, confs)
        defineMeta(propertyKey, confs, target)
    }
}

export function Query(options: ParamDecoratorOption) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)
        confs = setMeta({
            index: parameterIndex,
            source: "query",
            destination: options.destination,
            schema: options.schema
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}

export function Param(options: ParamDecoratorOption) {

    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "param",
            destination: options.destination,
            schema: options.schema
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}


export function Res() {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "res"
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}


export function Req() {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "req"
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}

export function Next() {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "next"
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}

export function Session() {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "session"
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}


export function IP() {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "ip"
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}

export function Header(destination: string) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)
        confs = setMeta({
            index: parameterIndex,
            source: "header",
            destination
        }, confs)
        defineMeta(propertyKey, confs, target)

    }
}

export function Admin() {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        // if (propertyKey == "getPaginationConfig")
        //     console.log("c", propertyKey, target.constructor.name)

        confs = setMeta({
            index: parameterIndex,
            source: "admin"
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}
interface UserOptions {
    required?: boolean
}
export function User(options?: UserOptions) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "user",
            required: options?.required
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}

export function FromReq(destination: string) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        var confs: any = getMeta(propertyKey, target)

        confs = setMeta({
            index: parameterIndex,
            source: "fromReq",
            destination
        }, confs)

        defineMeta(propertyKey, confs, target)

    }
}


function getMeta(propertyKey: string, target: Object) {
    var confs: any = Reflect.getMetadata(propertyKey + target.constructor.name, target) || {}
    return confs
}

function defineMeta(propertyKey: string, confs: any, target: Object) {
    Reflect.defineMetadata(propertyKey + target.constructor.name, confs, target)
}