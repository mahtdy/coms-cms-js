
import { exec } from 'child_process';

export default class Terminal {
    static async execute(command : string) : Promise<any>{
        return  new Promise((resolve , reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                    console.error(`Error executing command: ${error.message}` ,error);
                    console.log(stdout , stderr)
                } else {
                    resolve({})
                }
            });
        })
    }
}