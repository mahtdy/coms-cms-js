import { Response } from "../controller";

interface PermissionData {
    func: Function,
    args: {
        index: number,
        getter?: Function
    }[],
}
export default function HasPermission(helpers: PermissionData[]) {
    return async (...arggs: [...any]) => {
        try {
            for (let i = 0; i < helpers.length; i++) {
                var args = helpers[i].args.map(elem => {
                    if (elem.getter) return elem.getter(arggs[elem.index])
                    return arggs[elem.index]
                })
                var status = await helpers[i].func.apply(this, args)
                if (!status) {
                    return {
                        status: 401,
                        message: "permission denied"
                    }
                }
            }
            return {
                next: true
            }
        } catch (error) {
            throw error
        }
    }
}


// function addPermission()