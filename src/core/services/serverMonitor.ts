// import Ping from 'ping-url';
import ping from "ping"


export default class ServerMonitor {
    static async checkServer(url: string) {
        try {
            var res = await ping.promise.probe(new URL(url).hostname);
            return {
                status: res.alive,
                time: res.time
            }
        } catch (error) {
            throw error
        }
    }
}