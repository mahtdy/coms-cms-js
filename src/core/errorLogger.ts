// import SystemErrorLogRepository from "../services/repository/systemErrorLog"
// import SystemErrorLog from "../database/models/systemErrorLog"



export default function logSystemError(helper: (error: unknown) => any) {

    return (target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor
    ):
        PropertyDescriptor => {
        propertyDescriptor = propertyDescriptor;

        // const originalMethod = propertyDescriptor.value;

        // propertyDescriptor.value = async function (...args: any[]) {

        //     try {
        //         var result = await originalMethod.apply(this, args);

        //         return result;
        //     } catch (err) {
        //         await new SystemErrorLogRepository().insert(helper(err))
        //         throw err;
        //     }
        // };
        return propertyDescriptor;
    }

}

