import { FilterQuery, Document } from "mongoose";
import BaseRepositoryService, { QueryInfo, RepositoryConfigOptions } from "../../repository";
import Domain, { DomainModel } from "./model";
import { addNewDomainSSL } from "../../../services/nginx/nginx"
import fs from  "fs"
import webpush from "web-push"
import { exec } from 'child_process';
import { promisify } from 'util';
import LanguageRepository from "../language/repository";
import ConfigService from "../../../services/config";
const execPromise = promisify(exec);

export async function getCertificateExpiration(domain: string): Promise<string | null> {
    try {
        let res = await execPromise(`echo | openssl s_client -servername ${domain} -connect ${domain}:443 2>/dev/null | openssl x509 -noout -dates`);
        let stdout = res.stdout
        const expirationLine = stdout.split('notAfter=')[1];

        return expirationLine
    } catch (error) {
        // console.error('Error getting certificate expiration:', error);
    }
    return null;
}


export default class DomainRepository extends BaseRepositoryService<Domain> {
    languageRepo : LanguageRepository
    constructor(options?: RepositoryConfigOptions) {
        super(DomainModel, options)
        this.languageRepo = new LanguageRepository()
       
    }

    async initDomainsNotification(){
        try {
            let domains = await this.findAll({

            })
            for (let i = 0; i < domains.length; i++) {
                if(domains[i].notificationConfig == undefined){
                    const vapidKeys = webpush.generateVAPIDKeys();
                    await this.updateOne({
                        _id : domains[i]._id
                    } , {
                        $set : {
                            notificationConfig : {
                                publicKey : vapidKeys.publicKey,
                                privateKey : vapidKeys.privateKey,
                                email : ConfigService.getConfig("email")
                            }
                        }
                    })
                }
            }
        } catch (error) {
            throw error
        }
    }
    

    insert(document: Domain, options?: any): Promise<any> {
        let result = super.insert(document, options)
        if (document.adminDomain) {
            this.updateOne({
                _id: {
                    $ne: document._id
                },
                adminDomain: true
            }, {
                $set: {
                    adminDomain: false
                }
            })
        }
        if(document.sslType == "interim"){
            addNewDomainSSL(document.domain)
        }
        this.initDomainsNotification()
        return result
    }

    async updateOne(query: FilterQuery<Domain>, update: any, options?: any): Promise<any> {
        let result = super.updateOne(query, update, options)
        if (update.$set?.sslType == "interim") {
            let domain = await this.findOne(query)
            addNewDomainSSL(domain?.domain || "")
        }
        if (update.$set?.sslType == "none") {
            try {
                fs.unlinkSync(`/etc/nginx/conf.d/${query.domain}.conf`)
            } catch (error) {
                console.log(error)
            }
        }
        return result
    }

    async updateById(id: string, update: any, options?: any): Promise<any> {
        let result = super.updateById(id, update, options)
        if (update.$set?.sslType == "interim") {
            let domain = await this.findById(id)
             addNewDomainSSL(domain?.domain || "")
        }
        if (update.$set?.sslType == "none") {
            try {
                fs.unlinkSync(`/etc/nginx/conf.d/${id}.conf`)
            } catch (error) {
                console.log(error)
            }
        }   

        return result
    }

    async paginate(query: FilterQuery<Domain>, limit: number, page: number, options?: QueryInfo | undefined): Promise<{ list: any[] | Document<any, any, any>[]; count: number; }> {
        let res = await super.paginate(query, limit, page, options)

        for (let i = 0; i < res.list.length; i++) {
            if (res.list[i].sslType == "certificate" || res.list[i].sslType == "interim") {

            
                let expirationDate = await getCertificateExpiration(res.list[i].domain)
                if (expirationDate) {
                    res.list[i].certificateExpiration = new Date(expirationDate)
                }
                let language = await this.languageRepo.findOne({
                    domain : res.list[i]._id
                })
                if(language != null ){
                    res.list[i].language = language
                }

                // console.log(res.list[i].domain , res.list[i].certificateExpiration)

            }
        }

        return res
    }
}