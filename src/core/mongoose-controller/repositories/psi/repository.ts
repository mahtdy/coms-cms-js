import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import PSI, { PSI_Model } from "./model";
import schaduler from "../../../services/queue"
import { Job } from "agenda";
import ContentMaduleRegistry from "../../contentRegistry";
import PSI_LogRepository from "./psiLog/repository";
import RandomGenarator from "../../../random";
import SystemConfigRepository from "../system/repository";
import axios from "axios";
import ContentRepository from "../content/repository";
import DomainRepository from "../domain/repository";
import PagePSI_Repository from "./pagePSI/repository";




export default class PSI_Repository extends BaseRepositoryService<PSI> {
    psi_logRepo: PSI_LogRepository
    systemConfigRepo: SystemConfigRepository
    domainRepo: DomainRepository
    pagePSIRepo: PagePSI_Repository
    registry: ContentMaduleRegistry
    constructor(options?: RepositoryConfigOptions) {
        super(PSI_Model, options)
        this.psi_logRepo = new PSI_LogRepository()
        this.systemConfigRepo = new SystemConfigRepository()
        this.domainRepo = new DomainRepository()
        this.pagePSIRepo = new PagePSI_Repository()
        this.registry = ContentMaduleRegistry.getInstance()

        this.initQueue()
    }

    async initQueue() {
        schaduler.define("addPSITasks", this.addPSIs.bind(this))
        schaduler.define("doPSI", this.doPSI.bind(this))
        // this.addPSIs()
    }

    async insert(document: PSI, options?: any): Promise<PSI | any> {
        try {
            let d = await this.findOne({})
            var inserted

            if (d != null) {
                await this.updateOne({
                    _id: d._id
                }, {
                    $set: document
                })

                inserted = await this.findById(d._id)
            }
            else {
                inserted = await this.insert(document) as PSI
            }
            await this.updatePSIJobs(inserted as PSI)

            return inserted
        } catch (error) {
            throw error
        }

    }


    async updatePSIJobs(psi: PSI) {
        try {
            await this.deletePSIJobs()
            if(!psi.enabled){
                return 
            }
            let schedules = this.getJobDefinition(psi)

            for (let j = 0; j < schedules.length; j++) {
                schaduler.define(schedules[j].name, this.addPSIs.bind(this))
                let r = await schaduler.every(schedules[j].time, schedules[j].name, {
                    psiId: psi._id
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deletePSIJobs() {
        await schaduler._collection.deleteMany({
            "data.psiId": {
                $exists : true
            }
        })

    }

    getJobDefinition(doc: PSI) {
        let schedules: any[] = []

        if (doc.periodType == "daily") {
           

                schedules.push({
                    time: `0 0 * * *`,
                    name: RandomGenarator.getUniqueId()
                })
        }
        else if (doc.periodType == "weekly") {
            let weekDays = doc.periodConfig?.weekDays
            if (weekDays) {
                for (let i = 0; i < weekDays.length; i++) {
                    schedules.push({
                        time: `${weekDays[i]} at 0:0`,
                        name: RandomGenarator.getUniqueId()
                    })
                }
            }
        }
        else {
            let monthly = doc.periodConfig?.monthly
            if (monthly) {
                for (let i = 0; i < monthly.length; i++) {
                    
                    schedules.push({
                        time: `0 0 ${monthly[i].day} ${monthly[i].month} *`,
                        name: RandomGenarator.getUniqueId()
                    })
                }
            }
        }

        return schedules
    }


    async doPSI(job: Job) {
        console.log("doPSI", job.attrs.data)

        const module = this.registry.getRegistry(job.attrs.data["name"] as string)
        if (module == undefined)
            return

        const content = await module.repo?.findById(job.attrs.data["id"] as string)

        if (content == null || content.url == undefined)
            return


        var apiServer = await this.systemConfigRepo.getConfigValue("google_api_server")
        var apikey = await this.systemConfigRepo.getConfigValue("google_api_key")

        let page = ""

        let defaultDomain = await this.domainRepo.findOne({
            isDefault: true
        })

        if (content.url.startsWith("/")) {
            page = `https://${defaultDomain?.domain}${content.url}`
        }
        else {
            page = `https://${content.url}`
        }
        console.log("page", page)

        // return

        try {

            let responseMobile = await axios({
                method: 'post',
                url: apiServer + "users/google/pagespeed",
                headers: {
                    "x-api-key": apikey
                },
                data: {
                    page,
                    device: "mobile"
                }
            })

            let responseDesktop = await axios({
                method: 'post',
                url: apiServer + "users/google/pagespeed",
                headers: {
                    "x-api-key": apikey
                },
                data: {
                    page,
                    device: "desktop"
                }
            })


            let psi_log: any = {
                module: job.attrs.data["name"],
                id: job.attrs.data["id"],
                date: new Date(),
                desktopInfo: {
                    score: responseDesktop.data["lighthouseResult"]?.["categories"]?.["performance"]?.["score"],

                    "first-contentful-paint": responseDesktop.data["lighthouseResult"]?.["audits"]?.["first-contentful-paint"]?.["score"],
                    "speed-index": responseDesktop.data["lighthouseResult"]?.["audits"]?.["speed-index"]?.["score"],
                    "total-blocking-time": responseDesktop.data["lighthouseResult"]?.["audits"]?.["total-blocking-time"]?.["score"],
                    "largest-contentful-paint": responseDesktop.data["lighthouseResult"]?.["audits"]?.["largest-contentful-paint"]?.["score"],
                    "cumulative-layout-shift": responseDesktop.data["lighthouseResult"]?.["audits"]?.["cumulative-layout-shift"]?.["score"],
                    "time-to-interactive": responseDesktop.data["lighthouseResult"]?.["audits"]?.["interactive"]?.["score"]
                },

                mobileInfo: {
                    score: responseMobile.data["lighthouseResult"]?.["categories"]?.["performance"]?.["score"],

                    "first-contentful-paint": responseMobile.data["lighthouseResult"]?.["audits"]?.["first-contentful-paint"]?.["score"],
                    "speed-index": responseMobile.data["lighthouseResult"]?.["audits"]?.["speed-index"]?.["score"],
                    "total-blocking-time": responseMobile.data["lighthouseResult"]?.["audits"]?.["total-blocking-time"]?.["score"],
                    "largest-contentful-paint": responseMobile.data["lighthouseResult"]?.["audits"]?.["largest-contentful-paint"]?.["score"],
                    "cumulative-layout-shift": responseMobile.data["lighthouseResult"]?.["audits"]?.["cumulative-layout-shift"]?.["score"],
                    "time-to-interactive": responseMobile.data["lighthouseResult"]?.["audits"]?.["interactive"]?.["score"]
                }
            }

            let pagePSI: any = {
                module: job.attrs.data["name"],
                id: job.attrs.data["id"],
                date: new Date(),
                desktopJson: responseDesktop.data,
                mobileJson: responseMobile.data
            }
            try {
                await this.psi_logRepo.insert(psi_log as any)
                let r = await this.pagePSIRepo.insert(pagePSI as any)

                await this.pagePSIRepo.findOneAndDelete({
                    id : {
                        $eq : job.attrs.data["id"],
                    },
                    _id : {
                        $ne : r._id 
                    }
                })

                let psiMobile = responseMobile.data["lighthouseResult"]?.["categories"]?.["performance"]?.["score"]
                let psiDesktop = responseDesktop.data["lighthouseResult"]?.["categories"]?.["performance"]?.["score"]
                let psiAvreage


                if(psiMobile && psiDesktop){
                    psiAvreage = (psiMobile + psiDesktop) / 2 
                }
                 await module.repo?.collection.findByIdAndUpdate(job.attrs.data["id"] as string , {
                    $set : {
                        pagePsi : r._id,
                        psiMobile,
                        psiDesktop,
                        psiAvreage
                    }
                 })
            } catch (error) {
                console.log(error)
            }

        } catch (error) {

            console.log(error)
            return
        }



    }


    async addPSIs(job : Job) {
        let psiSetting = await this.findOne({
            enabled: true
        })
        if (psiSetting == null) {
            return
        }
        let registriesName = this.registry.getAllRegistriesName()
        for (let i = 0; i < registriesName.length; i++) {

            const module = this.registry.getRegistry(registriesName[i])
            let contents = await module?.repo?.findAll({
                isPublished: true,
                publishDate: {
                    $lt: new Date()
                }
            })

            for (let j = 0; j < (contents?.length || 0); j++) {
                let hour = Math.floor(Math.random() * 23) + 1;
                let minute = Math.floor(Math.random() * 60)

                // 
                const now = new Date();
                const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0)

                let c = contents?.[j] || undefined

                if (targetTime > now) {
                    schaduler.schedule(targetTime, "doPSI", {
                        name: registriesName[i],
                        id: c?._id || ""
                    })
                }

            }
        }
    }
}