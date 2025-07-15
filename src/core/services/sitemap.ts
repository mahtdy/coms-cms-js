import { SitemapStream, streamToPromise, SitemapIndexStream } from "sitemap"
import ContentRepository from "../mongoose-controller/repositories/content/repository"
import ContentMaduleRegistry from "../mongoose-controller/contentRegistry";
import ArticleContentProccessor from "./articleProccessing";
import RandomGenarator from "../random";
import { DiskFileManager } from "./fileManager";
import { Plugin } from "../plugin";
import { Route } from "../application";
import { Response } from "../controller";
import path from "path";
import GoogleApiTokenRepository from "../mongoose-controller/repositories/googleApiToken/repository";
import SystemConfigRepository from "../mongoose-controller/repositories/system/repository";
import axios from "axios";


export default class SiteMap {
    private static instance: SiteMap;
    // domainRepo: DomainRepository
    contentRepo: ContentRepository
    contentRegistry: ContentMaduleRegistry
    googleApiTokenRepo: GoogleApiTokenRepository
    systemConfigRepo: SystemConfigRepository
    constructor() {
        // this.domainRepo = new DomainRepository()
        this.googleApiTokenRepo = new GoogleApiTokenRepository()
        this.systemConfigRepo = new SystemConfigRepository()
        this.contentRepo = new ContentRepository()
        this.contentRegistry = ContentMaduleRegistry.getInstance()
    }


    async generateDomainSiteMap(
        domain: string,
        domainId: string,
        languages: string[]
    ) {
        // console.log(domain, domainId, languages)
        try {


            let stream = new SitemapStream({ hostname: `https://${domain}` })

            let contents = await this.contentRepo.findAll({
                language: {
                    $in: languages
                }
            }, {
                sort: {
                    _id: -1
                }
            })

            let streams: SitemapStream[] = []
            let contentcount = 0


            for (let i = 0; i < contents.length; i++) {
                let urlInfo: any = {
                    url: contents[i].url.replace(domain, "")
                }

                let repo = this.contentRegistry.getRegistry(contents[i].type)
                if (repo == undefined)
                    continue
                if (contents[i].type == "category") {
                    var contentData = await repo.repo?.findOne({
                        catID: contents[i].id,
                        language: contents[i].language,
                        lable: contents[i].categoryLable
                    })
                }
                else {
                    var contentData = await repo.repo?.findOne({
                        _id: contents[i].id
                    })
                }


                if (contentData != null) {
                    if (contentData.modifyDate) {
                        urlInfo["lastmod"] = contentData.modifyDate.toISOString().split('T')[0]
                    }
                    urlInfo["img"] = ArticleContentProccessor.getImages(contentData.content || "")

                    try {
                        let videos = await repo.repo?.getVideosDoc(contentData)

                        if (videos != undefined && videos?.length != 0) {
                            let videoResult: any[] = []

                            videoResult.push({
                                player_loc: videos[0].src,
                                thumbnail_loc: videos[0].screenshots?.[0],
                                title : contentData.title,
                                description : contents[i].metaDescription
                            })




                            if (videoResult.length > 0) {
                                urlInfo["video"] = videoResult
                            }
                        }
                    } catch (error) {

                    }

                }



                if (contents[i].changefreq) {
                    urlInfo["changefreq"] = contents[i].changefreq
                }

                if (contents[i].priority) {
                    urlInfo["priority"] = contents[i].priority
                }


                stream.write(urlInfo)
                contentcount += 1


                if (contentcount == 1000) {
                    streams.push(stream)
                    stream = new SitemapStream({ hostname: `https://${domain}` })
                    contentcount = 0
                }
            }

            if (contentcount != 0) {
                streams.push(stream)
            }
            let isExists = await DiskFileManager.isExists(`sitemap/${domain}/`)
            if (!isExists) {
                await DiskFileManager.mkdir("sitemap/", domain)
            }
            else {
                await DiskFileManager.removeFolderFiles(`sitemap/${domain}/`)
            }
            if (streams.length == 1) {
                let sitemapStream = streams[0]
                sitemapStream.end();
                var sitemap = await streamToPromise(sitemapStream).then(data => data.toString());
                await DiskFileManager.writeFile(`sitemap/${domain}/sitemap.xml`, sitemap)
                return
            }



            const sitemapIndexStream = new SitemapIndexStream();

            for (let i = 0; i < streams.length; i++) {
                // const element = array[i];
                let sitemapStream = streams[i]
                sitemapStream.end();

                const sitemap = await streamToPromise(sitemapStream).then(data => data.toString());

                // Save sitemap to a file
                console.log("befor", domain)
                await DiskFileManager.writeFile(`sitemap/${domain}/sitemap-${i + 1}.xml`, sitemap)
                console.log("after", domain)
                sitemapIndexStream.write({ url: `https://${domain}/sitemap-${i + 1}.xml`, lastmod: new Date().toISOString() });

            }

            sitemapIndexStream.end();
            var sitemap = await streamToPromise(sitemapIndexStream).then(data => data.toString());
            await DiskFileManager.writeFile(`sitemap/${domain}/sitemap.xml`, sitemap)
            // console.log(count)


            // )
        } catch (error) {
            console.log(error)
        }
    }

    async generateSiteMap() {
        try {



            var apiServer = await this.systemConfigRepo.getConfigValue("google_api_server")
            var apikey = await this.systemConfigRepo.getConfigValue("google_api_key")
            var google_conf = await this.systemConfigRepo.getConfigValue("google_credential")

            var languages = await this.contentRepo.domainRepo.languageRepo.findAll({
                status: true,
                domain: {
                    $exists: false
                }
            })

            let languageIds = []
            for (let i = 0; i < languages.length; i++) {
                languageIds.push(languages[i]._id.toHexString())
            }

            let domain = await this.contentRepo.domainRepo.findOne({
                isDefault: true
            })
            if (domain != null) {
                try {


                    await this.generateDomainSiteMap(domain?.domain, domain?._id, languageIds)

                    let webmasterToken = await this.googleApiTokenRepo.findOne({
                        type: "webmaster",
                        domains: domain._id
                    })
                    if (webmasterToken != null) {
                        let webmaster_conf = webmasterToken.token
                        if (webmaster_conf != undefined && google_conf != undefined) {
                            let response = await axios({
                                method: 'post',
                                url: apiServer + "users/sitemap/add",
                                headers: {
                                    "x-api-key": apikey
                                },
                                data: {
                                    credential: google_conf,
                                    token: webmaster_conf,
                                    siteUrl: domain?.domain,
                                    // siteUrl : "aroncare.com"
                                }
                            })
                        }


                    }

                } catch (error) {

                }
            }

            var languages = await this.contentRepo.domainRepo.languageRepo.findAll({
                status: true,
                domain: {
                    $exists: true
                }
            })


            languageIds = []
            for (let i = 0; i < languages.length; i++) {
                let domain = await this.contentRepo.domainRepo.findOne({
                    _id: (languages[i].domain as any)?.toHexString()
                })

                if (domain != null) {


                    try {


                        await this.generateDomainSiteMap(domain?.domain, domain?._id, languages[i]._id.toHexString())

                        let webmasterToken = await this.googleApiTokenRepo.findOne({
                            type: "webmaster",
                            domains: domain._id
                        })
                        if (webmasterToken != null) {
                            let webmaster_conf = webmasterToken.token
                            if (webmaster_conf != undefined && google_conf != undefined) {
                                let response = await axios({
                                    method: 'post',
                                    url: apiServer + "users/sitemap/add",
                                    headers: {
                                        "x-api-key": apikey
                                    },
                                    data: {
                                        credential: google_conf,
                                        token: webmaster_conf,
                                        siteUrl: domain?.domain
                                    }
                                })
                            }


                        }

                    } catch (error) {

                    }
                }


            }





        } catch (error) {
            console.log(error)
        }
    }


    public static getInstance(): SiteMap {
        if (!SiteMap.instance) {
            SiteMap.instance = new SiteMap();

        }
        else {
            console.log(this.instance)
        }
        return SiteMap.instance;
    }

}

export class SiteMapPlugin implements Plugin {


    constructor() {

    }

    async init() {
        // console.log(this._config)
    }


    async getSitmap(
        host: string,
        index?: number
    ): Promise<Response> {
        // console.log(host, index)
        try {
            let data = path.join(process.cwd(), `./sitemap/${host}/sitemap${index != undefined ? "-" + index : ""}.xml`)
            let exists = await DiskFileManager.isFileExists(data)
            if (!exists) {
                return {
                    status: 404,
                    json: false,
                    data: "not found"
                }
            }
            return {
                status: 200,
                json: false,
                data,
                isFilePath: true
            }
        } catch (error) {
            console.log(error)
            return {
                status: 404
            }
        }

    }


    serve(): Route[] {
        var routes: Route[] = []
        routes.push({
            execs: this.getSitmap.bind(this),
            method: "get",
            route: "/sitemap.xml",
            meta: {
                params: {
                    "0": {
                        index: 0,
                        source: "header",
                        destination: "host"
                    }
                }
            }
        })

        routes.push({
            execs: this.getSitmap.bind(this),
            method: "get",
            route: "/sitemap-:index.xml/",
            meta: {
                params: {
                    "0": {
                        index: 0,
                        source: "header",
                        destination: "host"
                    },
                    "1": {
                        index: 1,
                        source: "param",
                        destination: "index"
                    }
                }
            }
        })


        return routes
    }

}
