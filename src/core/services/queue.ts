
import Agenda, { Job } from "agenda";
import ConfigService from "./config";
import SmsMessager from "../messaging/smsMessager";
import EmailMessager from "../messaging/emailMessager";
// import NotificationMessager from "../messaging/notification";
import InternalMessager from "../messaging/internalMessager";

import { exec } from "child_process"
import SiteMap from "./sitemap";



var schaduler = new Agenda({
    db: {

        address: ConfigService.getConfig("DB_URL"),
        collection: "jobs",
        options: {
            authSource: "admin",
            auth: {
                username: ConfigService.getConfig("DB_USER"),
                password: ConfigService.getConfig("DB_PASSWORD")
            },
            connectTimeoutMS: 100000

        }
    }
});

export const connectionQueue = async function () {
    schaduler.processEvery('1 second');
    // if (port() == 5000) {
    //     await schaduler.start();
    // }
}






schaduler.define("publishContent", async function (job: Job) {
    // var articleRepo = new ArticleRepository()



    await job.attrs.data?.publish(
        job.attrs.data?.id as string || ""
    )
})


schaduler.define("publishSubContent", async function (job: Job) {
   
    await job.attrs.data?.publishSubContent(
        job.attrs.data?.id as string || "",
        job.attrs.data?.subId as string || ""
    )
})




schaduler.define("sendSMS", function (job: Job) {
    // console.log(job.attrs.data)
    SmsMessager.send(
        job.attrs.data as any
    )
})



schaduler.define("sendSMSMulti", function (job: Job) {
    // console.log(job.attrs.data)
    SmsMessager.sendMulti(
        job.attrs.data as any
    )
})

schaduler.define("renew ssl", function (job: Job) {
    // console.log(job.attrs.data)
    exec('certbot renew --nginx', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`sslllllllllllllllllll stdout: ${stdout}`);
    });
})


schaduler.define("generate sitemap", function (job: Job) {
    // console.log(job.attrs.data)
    try {
        // const sitemap = SiteMap.getInstance()

        // sitemap.generateSiteMap()
    } catch (error) {
        
    }
})



schaduler.define("sendEmail", function (job: Job) {
    // console.log(job.attrs.data)
    EmailMessager.send(
        job.attrs.data as any
    )
})


schaduler.define("sendEmailMulti", function (job: Job) {
    // console.log(job.attrs.data)
    EmailMessager.sendMulti(
        job.attrs.data as any
    )
})




schaduler.define("sendNotif", function (job: Job) {
    // console.log(job.attrs.data)
    // NotificationMessager.send(
    //     job.attrs.data as any
    // )
})


schaduler.define("sendNotifMulti", function (job: Job) {
    // console.log(job.attrs.data)
    // NotificationMessager.send(
    //     job.attrs.data as any
    // )
})


schaduler.define("sendInternal", function (job: Job) {
    // console.log(job.attrs.data)
    InternalMessager.send(
        job.attrs.data as any
    )
})


schaduler.define("sendInternalMulti", function (job: Job) {
    // console.log(job.attrs.data)
    InternalMessager.sendMulti(
        job.attrs.data as any
    )
})



schaduler.start()


schaduler.on("ready", async function () {
    console.log("agenda start")
    await schaduler.every('0 0 * * *', 'renew ssl');
    await schaduler.every('0 0 * * *', 'generate sitemap');

})



export default schaduler

// import "./queue/checkGoogle"

