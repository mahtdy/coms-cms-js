import { Response } from "express";

export function logAction(target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
): PropertyDescriptor {
    propertyDescriptor = propertyDescriptor;

    const originalMethod = propertyDescriptor.value;


    propertyDescriptor.value = async function (...args: any[]) {

        try {
            var res: Response = args[1]
            // var { send } = res;
            // res.send =  (data)=> {
            //     console.log(data, new Date())
            //     // res.resp = data
            //      return this
            // };
           
            res = await originalMethod.apply(this, args);
            return res


        } catch (err) {
            throw err;
        }
    };
    return propertyDescriptor;
}