

import Cloadflare from "cloudflare"


export default class CloadFlareHelper {
    domain?: string
    id: string
    apikey: string
    email: string
    cf: Cloadflare
    constructor(
        apikey: string,
        email: string,
        id: string
    ) {
        this.apikey = apikey
        this.email = email
        this.id = id

        console.log({
            email: this.email,
            key: this.apikey
        })
        this.cf = new Cloadflare({
            apiEmail: this.email,
            apiKey: this.apikey
        })

    }

    



    async addNameServer(ip: string, zoneid: string,name : string) {
        try {
            let res :any= await this.cf.dns.records.create({
                zone_id : zoneid,
                type: 'A',
                name,
                content: ip,
                ttl: 5000,
                proxied: true,
                
            });
            return {
                name , 
                id : res['result']?.id
            }
        } catch (error: any) {
            console.log(error.response.body)
            throw error
        }

    }


    async deleteNameServers(zoneId :string, recordId :string ){
        console.log(zoneId , recordId)
        try {
           await this.cf.dns.records.delete(recordId, {
            zone_id : zoneId
           } )
        } catch (error) {
            throw error
        }
    }

    async getNameServers(zone_id : string){
        try {
            let nameServers = await this.cf.dns.records.list({
                zone_id 
            })
            return nameServers
        } catch (error) {
            throw error
        }
    }

    async getZones() {
        try {
            let result: any = await this.cf.zones.list()
            let zones: any[] = result['result']

         
            return zones.map((data: any) => {
                return {
                    domain: data['name'],
                    zoneid: data['id'],
                    name_servers: data['name_servers'],
                    status :data['status']

                }
            })

        } catch (error) {
            throw error
        }
    }

    async getActiveZones() {
        try {
            let zones = await this.getZones()
            zones = zones.filter((data: any) => {
                return data['status'] == 'active'
            })
            return zones
        } catch (error) {
            throw error
        }
    }


}
// f2c9ad8966fefebb264bf74de8ce3311c347d
// 0128713eb7c7721193711cb6be9d537c

