import { Response } from "./controller";

export function logAction(target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
): PropertyDescriptor {
    propertyDescriptor = propertyDescriptor;

    const originalMethod = propertyDescriptor.value;


    propertyDescriptor.value = async function (...args: any[]) {

        try {

            var result: Response = await originalMethod.apply(this, args);

            // if (result != undefined) {
            //     result?.on("finish", async function () {
            //         await new LogRepository().insert({
            //             url: result?.req?.url || "",
            //             method: result?.req?.method || "",
            //             ipAddress: result?.req?.headers['x-forwarded-for'] || result?.req?.connection.remoteAddress,
            //             body: result?.req?.body,
            //             query: result?.req?.query,
            //             success: result?.statusCode == 200,
            //             statusCode: result?.statusCode,
            //             response: JSON.parse(result?.response),
            //             admin: args[0].session.admin?._id || undefined
            //         } as unknown as Log)
            //     })
            // }
            return result;
        } catch (err) {
            throw err;
        }
    };
    return propertyDescriptor;
}