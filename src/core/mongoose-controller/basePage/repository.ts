import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from "mongoose";
import BaseRepositoryService, { QueryInfo, RepositoryConfigOptions } from "../repository";
import ContentRepository, { customUrlBuilder, InsertOptions } from "../repositories/content/repository";
import FileUsesRepository from "../repositories/fileUses/repository";
import ContentMaduleRegistry, { FromOwnFields, QueryInterface } from "../contentRegistry";
import schaduler from "../../services/queue";
import { BasePage } from "./model";
import { ProccessName, ProccessStatus } from "../repositories/article/model";
import SeoDraftRepository from "../repositories/seoDraft/repository";
import VideoQueueRepository from "../repositories/videoQueue/repository";
// import { ConsumeMessage } from "amqplib";
import amqplib from "amqplib"
import CDN_Manager, { DiskFileManager } from "../../services/fileManager";
import path from "path";
import { VideoQueueStatus } from "../repositories/videoQueue/model";
import SystemConfigRepository from "../repositories/system/repository";
import LanguageRepository from "../repositories/language/repository";
import DomainRepository from "../repositories/domain/repository";
import DomainVideoConfigRepository from "../repositories/domainVideoConfig/repository";
import { JSDOM } from "jsdom"
import DomainImageConfigRepository from "../repositories/domainImageConfig/repository";
import ImageProccessesor from "../../services/imageProccessing";
import VideoRegistry from "../videoRegistry";
import ContentPublishQueueRepository from "../repositories/contentPublishQueue/repository";
import ContentPublishLogRepository from "../repositories/contentPublishQueue/log/repository";
import axios from "axios";
import { Job } from "agenda";
import GoogleApiTokenRepository from "../repositories/googleApiToken/repository";
import PublishCycleRepository from "../repositories/publishCycle/repository";
import ArticleContentProccessor from "../../services/articleProccessing";
import { scheduler } from "timers/promises";
import CommentRepository from "../repositories/comment/repository";
import FakeCommentRepository from "../repositories/fakeComment/repository";
import ConfigService from "../../services/config";

export interface BasePageOptions<T> {
    model: Model<T>,
    typeName: string,
    contentFunc?: Function,
    queryData?: QueryInterface[],
    fromOwn?: FromOwnFields[],
    defaultExact?: string,
    selectData: any,
    sort: any
}

const confRepo = new SystemConfigRepository()
export interface PublishOptions {
    imageProccessed?: boolean,
    videoProccessed?: boolean,
    category?: string,
    _id?: Types.ObjectId
}


function getUploadDestination(
    staticPath: string,
    dynamicPathStyle: "y" | "y-m" | "y-m-d" | "y-n" | "n" | "y-m-n",
    contentNumber?: number
) {
    let secondPart = "";
    let today = new Date();
    switch (dynamicPathStyle) {
        case "y":
            secondPart = today.getFullYear().toString() + "/";
            break;
        case "y-m":
            secondPart =
                today.getFullYear().toString() +
                "/" +
                today.getMonth().toString() +
                "/";
            break;
        case "y-m-d":
            secondPart =
                today.getFullYear().toString() +
                "/" +
                today.getMonth().toString() +
                "/" +
                today.getDate().toString() +
                "/";
            break;
        case "y-n":
            secondPart = today.getFullYear().toString() +
                "/" +
                contentNumber?.toString() +
                "/";
            break;
        case "n":
            secondPart = contentNumber?.toString() + "/";
            break;
        case "y-m-n":
            secondPart =
                today.getFullYear().toString() +
                "/" +
                today.getMonth().toString() +
                "/" +
                contentNumber?.toString() +
                "/";
            break;
        default:
            break;
    }
    return staticPath + secondPart;
}

function getPathResolver(
    contentType: "video" | "image" | "sound" | "document",
    path: string = "content/",
    style?: string,
    contentNumber?: number
) {
    return async () => {
        try {
            if (contentType === "video") {
                var staticPath: any = path;
            }
            else if (contentType == "image" && style != undefined) {
                var staticPath: any = path;
            }
            else
                var staticPath = await confRepo.getConfigValue(`${contentType}-folder`);
            let dynamicPathStyle = await confRepo.getConfigValue(
                `${contentType}-folder-dynamic-style`
            );
            return getUploadDestination(staticPath, style || dynamicPathStyle, contentNumber);
        } catch (error) {
            throw error;
        }
    };
}


// function addPublishLog(target: any,
//     propertyKey: string,
//     propertyDescriptor: PropertyDescriptor
// ): PropertyDescriptor {
//     propertyDescriptor = propertyDescriptor;
//     const originalMethod = propertyDescriptor.value;


//     propertyDescriptor.value = async function (...args: any[]) {
//         const self = this as BasePageRepository<BasePage>;
//         let content = ""
//         try {
//             var result = await originalMethod.apply(this, args);

//             let doc = await self.findOne({
//                 _id: args[0],
//                 "contents._id": args[1]
//             }, {
//                 projection : {
//                     contents: { $elemMatch: { _id: args[1] } } 
//                 }
//             })
//             if(doc == null) {
//                 return
//             }
//             content = doc.contents?.[0]?.content || ""
//             await self.contentPublishLogRepo.insert({
//                 pageType : this.typeName,
//                 page : args[0],
//                 subId : args[1],
//                 date : new Date(),
//                 webmasterUpdated : true,
//                 content 
//             } as any)

//             return result;
//         } catch (err :any) {
//             // // console.log(err)
//             // err.message
//             await self.contentPublishLogRepo.insert({
//                 pageType : this.typeName,
//                 page : args[0],
//                 subId : args[1],
//                 date : new Date(),
//                 webmasterUpdated : true,
//                 error : err.message,
//                 content
//             } as any)
//             throw err;
//         }
//     };
//     return propertyDescriptor;
// }


export default class BasePageRepository<T extends BasePage> extends BaseRepositoryService<T> {
    contentRepo: ContentRepository;
    fileUsesRepo: FileUsesRepository;
    typeName: string;
    contentFunc?: Function;
    seoDraftRepo: SeoDraftRepository;
    videoRepo: VideoQueueRepository;
    cdn: CDN_Manager;
    systemConfigRepo: SystemConfigRepository
    langRepo: LanguageRepository
    domainRepo: DomainRepository
    domainVideoRepo: DomainVideoConfigRepository
    domainImageRepo: DomainImageConfigRepository
    videoRegistry: VideoRegistry
    contentPublishQueueRepo: ContentPublishQueueRepository
    googleApiTokenRepo: GoogleApiTokenRepository
    publishCycleRepo: PublishCycleRepository
    commentRepo: CommentRepository
    fakeCommentRepo: FakeCommentRepository
    constructor(options: RepositoryConfigOptions & BasePageOptions<T>) {
        super(options.model, options)
        this.typeName = options.typeName
        this.contentFunc = options.contentFunc
        if (this.typeName != undefined && this.contentFunc) {
            customUrlBuilder[this.typeName] = this.contentFunc
        }
        this.fileUsesRepo = new FileUsesRepository();
        this.contentRepo = new ContentRepository()
        var contentMaduleRegistry = ContentMaduleRegistry.getInstance()

        contentMaduleRegistry.add({
            name: options.typeName,
            repo: this as any,
            fromOwn: options.fromOwn,
            queryData: options.queryData,
            defaultExact: options.defaultExact,
            selectData: options.selectData,
            sort: options.sort
        })
        this.videoRegistry = VideoRegistry.getInstance()

        this.seoDraftRepo = new SeoDraftRepository()
        this.videoRepo = new VideoQueueRepository()
        this.cdn = new CDN_Manager()
        this.systemConfigRepo = new SystemConfigRepository()
        this.waitToConsume()
        this.domainRepo = new DomainRepository()
        this.langRepo = new LanguageRepository()
        this.domainVideoRepo = new DomainVideoConfigRepository()
        this.domainImageRepo = new DomainImageConfigRepository()

        this.contentPublishQueueRepo = new ContentPublishQueueRepository()
        this.publishCycleRepo = new PublishCycleRepository()
        this.googleApiTokenRepo = new GoogleApiTokenRepository()
        this.commentRepo = new CommentRepository()
        this.fakeCommentRepo = new FakeCommentRepository()

        this.defineScheduler()

    }

    defineScheduler() {
        schaduler.define(`publishSubContent-${this.typeName}`, this.publishSubContentTask.bind(this));
        schaduler.define(`publishContent-${this.typeName}`, this.publishContentTask.bind(this));
        schaduler.define(`publisCommonQuestion-${this.typeName}`, this.publishCommonQuestionTask.bind(this));
        schaduler.define(`publishComment-${this.typeName}`, this.publishCommentTask.bind(this));

        schaduler.define(`publishCommentReply-${this.typeName}`, this.publishCommentReplyTask.bind(this));

    }

    async publishSubContentTask(job: Job) {
        return await this.publishSubContent(job.attrs.data.id, job.attrs.data.subId)
    }

    async publishContentTask(job: Job) {
        return await this.publish(job.attrs.data.id)
    }

    async publishCommonQuestionTask(job: Job) {
        return await this.publishSubContent(job.attrs.data.id, job.attrs.data.subId)
    }

    async publishCommentTask(job: Job) {
        return await this.publishCommnet(job.attrs.data.commentId)
    }

    async publishCommentReplyTask(job: Job) {
        return await this.publishCommentReply(job.attrs.data.commentId, job.attrs.data.replyId)
    }

    async getUploadFolders(langId: string, type?: string) {
        let lang = await this.langRepo.findById(langId)

        if (lang?.domain) {
            var domain = await this.domainRepo.findById(lang.domain as string)
        }
        else {
            var domain = await this.domainRepo.findOne({
                isDefault: true
            })
        }

        let q: any = {
            domain: domain?._id
        }

        var domainVideo: any = null
        if (type != undefined) {
            q["type"] = type
            domainVideo = await this.domainVideoRepo.findOne(q)
        }

        if (domainVideo == null)
            domainVideo = await this.domainVideoRepo.findOne({
                domain: domain?._id
            })

        let savePaths = domainVideo?.["save-paths"] || []

        let data: any = {}
        for (let i = 0; i < savePaths.length; i++) {
            data[savePaths[i].quality] = {
                path: savePaths[i].path,
                fileManager: savePaths[i].fileManager,
            }
        }
        return data
    }


    async getUploadInfo(dimension: string, uploadConfig: any) {
        let l = dimension.split("x")[1] + "p"
        if (uploadConfig[l]) {
            return uploadConfig[l]
        }
        if (uploadConfig["all"]) {
            return uploadConfig["all"]
        }
        return await this.systemConfigRepo.getConfigValue("save-path")
    }



    async waitToConsume() {
        this.videoRepo.rabbitmq.consume("videoResult", async (msg: amqplib.ConsumeMessage | null) => {
            var content = (msg?.content.toString() || "")
            try {

                var jsonData = JSON.parse(content)
                await this.cdn.findCdnFromUrl(jsonData['src'])
                const video = await this.videoRepo.findOne({
                    src: jsonData['src']
                })

                const article = await this.findOne({
                    video: video?._id
                })

                let files = jsonData.result
                const dirName = Date.now().toString()

                let todeletePath: string[] = []

                let type = video?.type

                let uploadConfig = await this.getUploadFolders(article?._id, type)
                for (let i = 0; i < files.length; i++) {
                    console.log(i ,files[i].path )
                    let file = await DiskFileManager.downloadFile(files[i].path)
                    console.log("file" , file)
                    
                 
                    let uploadInfo = await this.getUploadInfo(files[i].dimension, uploadConfig)
                    let dynamicPathStyle = await this.systemConfigRepo.getConfigValue(
                        "video-folder-dynamic-style"
                    );
                    let p = getUploadDestination(uploadInfo.path, dynamicPathStyle);
                    this.cdn.CDN_id = uploadInfo.fileManager
                    await this.cdn.init(true)

                    const fileURL = await this.cdn.upload(file as string, p + path.basename(file as string))
                    
                    todeletePath.push(files[i].path)
                    files[i].path = fileURL
                }
                try {
                    const channel = await this.videoRepo.rabbitmq.getChannel()
                    channel?.assertQueue("delete-video")
                    channel?.sendToQueue("delete-video", Buffer.from(JSON.stringify(
                        {
                            "delete-files": todeletePath
                        }
                    )))
                } catch (error) {

                }

                await this.videoRepo.proccessed(jsonData['src'], files)
                await this.chackForVideoProccessd(video?._id)

                if (type != undefined) {
                    let repo = this.videoRegistry.get(type)

                    if (repo != undefined) {
                        await repo.repo.proccessVideo(video?._id)
                    }
                }
            } catch (error) {
                console.log(error)
                return true
            }
        })
    }

    async chackForVideoProccessd(video: string) {
        const article = await this.findOne({
            video
        })

        if (article != null) {
            await this.checkFileUses(article._id)
            // check for other videos of this article is ok 
            if (article?.videos) {
                let isExists = await this.videoRepo.isExists({
                    _id: {
                        $in: article?.videos
                    },
                    status: {
                        $ne: VideoQueueStatus.done
                    }
                })
                if (isExists) {
                    return
                }
            }
            this.proccessedVideo(article._id)
        }

        const otherArticles = await this.findAll({
            videos: video
        })
        for (let i = 0; i < otherArticles.length; i++) {
            let videos = this.getVideos(otherArticles[i])
            // if (otherArticles[i].video) {
            //     videos?.push(otherArticles[i].video as string)
            // }
            await this.checkFileUses(otherArticles[i]._id)
            let isExists = await this.videoRepo.isExists({
                _id: {
                    $in: videos
                },
                status: {
                    $ne: VideoQueueStatus.done
                }
            })
            if (!isExists) {
                this.proccessedVideo(otherArticles[i]._id)
            }
        }
    }


    getVideos(article: T, justMain: boolean = false) {
        let videos: string[] = []
        if (article != null) {
            if (article.videos && article.videos.length > 0 && justMain == false) {
                if (typeof article.videos[0] != "string") {
                    for (let i = 0; i < article.videos.length; i++) {
                        let id = (article.videos[i] as any)._id || (article.videos[i] as any).toHexString()
                        videos.push(id)
                    }
                }
                else {
                    for (let i = 0; i < article.videos.length; i++) {
                        videos.push(article.videos[i] as any)
                    }
                }
            }
            if (article.video) {
                if (typeof article.video != "string") {
                    let id = (article.video as any)._id || (article.video as any).toHexString()
                    videos.push(id)
                }
                else {
                    videos.push(article.video as any)
                }
            }
        }
        return videos
    }

    async proccessedVideo(id: string) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    videoProccessed: true
                }
            })
        } catch (error) {

        }
    }

    async insert(document: T): Promise<T> {
        try {
            let options: any = {}
            if (document.isDraft)
                options["validateBeforeSave"] = true

            var res = await super.insert(document) as T

            if (res.video) {
                await this.videoRepo.updateOne({
                    _id: res.video
                }, {
                    $set: {
                        id: res._id,
                        type: this.typeName,
                        locked: true
                    }
                })
            }
            await this.checkFileUses(res._id.toString())
            if (!document.isDraft && document.publishDate != undefined) {
                await schaduler.schedule(document.publishDate as Date, `publishContent-${this.typeName}`, {
                    id: res._id.toString(),
                    publish: this.publish.bind(this)
                })
            }
            else if (document.isPublished) {
                try {
                    await this.publish(res._id, {
                        category: this.typeName == "category" ? (document as any).catID : undefined
                    })
                } catch (error) {
                    throw error
                }
            }
            else {
                this.insertToSeoDraft(res)
            }


            if (document.contentLanguages && document.contentLanguages?.length! > 0) {
                for (let i = 0; i < document.contentLanguages!.length!; i++) {
                    try {
                        let lst = [...document.contentLanguages || []]
                        lst[i].content = document._id
                        await super.updateOne({
                            _id: document?.contentLanguages[i].content
                        }, {
                            $set: {
                                contentLanguages: lst
                            }
                        })
                    } catch (error) {

                    }
                }
            }


            return res
        } catch (error) {
            throw error
        }

    }

    async getURL(url: string, isStatic: boolean, language: string, category?: string) {
        try {
            return await this.contentRepo.makeURL(url, isStatic, {
                type: this.typeName,
                customFunc: this.contentFunc,
                category: category as string,
                language: language as string
            })
        } catch (error) {
            throw error
        }
    }

    async insertToSeoDraft(res: any) {
        let data: any = {
            id: res._id,
            type: res.seo.type,
            language: res.language,

            seoTitle: res.seo.seoTitle,
            title: res.title,
            mainKeyWord: res.seo.mainKeyWord,
            keyWords: res.seo.keyWords,
        }
        if (res.seo.type == "category") {
            data["categoryLable"] = res.seo.categoryLable
        }
        if (res.seo.url != "") {
            data["url"] = await this.contentRepo.makeURL(res.seo.url, res.seo.isStatic, {
                type: this.typeName,
                customFunc: this.contentFunc,
                category: res.category as string,
                language: res.language as string
            })
        }
        try {

            await this.seoDraftRepo.upsert(data)
        } catch (error) {

        }
    }

    async paginate(
        query: {}, limit: number,
        page: number,
        options: any)
        : Promise<{
            list: Document[] | any[],
            count: number
        }> {
        try {
            let res = await super.paginate(query, limit, page, options)
            let lst: any[] = res.list
            try {

                let defaultDomain = await this.domainRepo.findOne({
                    isDefault: true
                })
                for (let i = 0; i < lst.length; i++) {
                    if (lst[i].seoContent && lst[i].seoContent.url != undefined) {
                        lst[i].psi = encodeURI(lst[i].seoContent.url.startsWith("/") ? `https://${defaultDomain?.domain}${lst[i].seoContent.url}` : `https://${lst[i].seoContent.url}`)
                    }
                }
                res.list = lst

            }
            catch (error) {

            }
            return res
        } catch (error) {
            throw error
        }

    }


    async getBlockData(
        query: {}, limit: number,
        page: number,
        options: any) {
        return super.findMany(query, options, page, limit)
    }

    async findById(id: string | Types.ObjectId, queryInfo?: QueryInfo | undefined, population?: Object[]): Promise<T | null> {
        var d = await super.findById(id, queryInfo, population || queryInfo?.population)
        if (d != null) {
            var c = await this.contentRepo.findOne({
                id,
                type: this.typeName
            })
            if (c != null)
                d.seo = c
        }
        return d
    }

    public async findOne(query: FilterQuery<T>, queryInfo?: QueryInfo | undefined, population?: Object[]): Promise<T | null> {
        var d = await super.findOne(query, queryInfo, population)
        if (d != null) {
            var c = await this.contentRepo.findOne({
                id: d._id,
                type: this.typeName
            })
            if (c != null)
                d.seo = c
        }
        return d
    }

    public async passVideoProccess(id: Types.ObjectId) {
        return await this.findOneAndUpdate({
            _id: id,
            "proccesses.name": ProccessName.videos
        }, {
            $set: {
                "proccesses.$.status": ProccessStatus.finished
            }

        })
    }

    public async view(query: FilterQuery<T>): Promise<T | null> {
        var data = await this.findOne(query, {}, [
            {
                path: "author",
                select: ["name", "familyName"]
            },
            {
                path: "category"
            },
            {
                path: "language"
            }
        ])
        this.updateOne(query, {
            $inc: {
                view: 1
            }
        })
        return data
    }


    async extractImageUrls(html: string) {
        const { window } = new JSDOM(html);
        const { document } = window;
        const imgElements = document.querySelectorAll('img');

        let results = []
        for (let i = 0; i < imgElements.length; i++) {
            let img = imgElements[i]
            let width = img.getAttribute("width")

            if (width == null) {
                try {
                    let r = await ImageProccessesor.getDimensions(img.getAttribute("src") as string)
                    width = r.width.toString()
                } catch (error) {



                }
            }
            results.push({
                src: img.getAttribute('src'),
                width,
                original: img.getAttribute("original")
            })

        }

        return results

    };

    async processImage(id: string) {

    }

    public async publish(id: Types.ObjectId | string, options?: PublishOptions) {

        let updateQuery: any = {
            $set: {
                publishDate: new Date(),
                isPublished: true,
                isDraft: false
            }
        }
        if (options?.videoProccessed) {
            updateQuery['$set']['videoProccessed'] = true
        }
        if (options?.imageProccessed) {
            updateQuery['$set']['imageProccessed'] = true
        }

        var doc = await this.findOneAndUpdate({
            _id: id
        }, updateQuery)

        if (doc?.video) {
            await this.videoRepo.startProccess(doc?.video as string, doc?.language as string)
        }

        await schaduler.cancel({
            name: `publishContent-${this.typeName}`,
            "data.id": id
        })

        var content = await this.contentRepo.insert(Object.assign(doc?.seo, {
            _id: options?._id,
            type: this.typeName,
            id: options?.category || doc?._id
        }), {
            type: this.typeName,
            category: doc?.category as string,
            language: doc?.language as string,
            customFunc: this.contentFunc
        })

        await this.findByIdAndUpdate(id, {
            $set: {
                seoContent: content._id
            }
        })




        var query: any = {
            id: doc?._id,
            type: this.typeName,
            language: doc?.language
        }
        if (doc?.seo.type == "category") {
            query['categoryLable'] = doc?.seo.categoryLable
        }
        await this.seoDraftRepo.findOneAndDelete(query)
        
        await this.updateOne({
            _id: id
        }, {
            $set: {
                url: content.url
            }
        })

        await this.proccessImageAfterPublish(doc as T)
        this.doOnPublish(id).then(() => { }).catch((error) => {

        })

        return content.url


    }

    async updateOne(query: FilterQuery<T>, data: UpdateQuery<T>, options?: QueryOptions<T> | undefined): Promise<any> {
        let res = await super.updateOne(query, data, options)
        var doc = await this.findOne(query)
        if (doc != null)
            await this.checkFileUses(doc._id.toString())
        return res
    }


    public async unPublish(id: Types.ObjectId | string) {
        var doc = await this.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                // publishDate: new Date(),
                isPublished: false,
                modifyDate: new Date()
                // isDraft: false
            },
            $unset: {
                publishDate: 1
            }

        })
        await schaduler.cancel({
            name: `publishContent-${this.typeName}`,
            "data.id": id
        })


        await this.contentRepo.findOneAndDelete({
            id,
            type: this.typeName
        })

        this.doOnUnPublish(id)

        return true

    }

    public async checkForChangeUrl(id: Types.ObjectId | string, content: any) {
        this.contentRepo
    }

    public async findOneAndUpdate(query: FilterQuery<T>, queryData: UpdateQuery<T>): Promise<T | null> {
        try {

            var before = await this.findOne(query, { fromDb: true })
            var res = await super.findOneAndUpdate(query, queryData)
            var after = await this.collection.findOne(query)

            if (before != null && after != null) {
                if (before.isPublished) {
                    if (!after.isPublished) {
                        await this.unPublish(after._id)
                        if (after.publishDate != undefined) {
                            await schaduler.schedule(after.publishDate as Date, `publishContent-${this.typeName}`, {
                                id: after._id.toString(),
                                publish: this.publish.bind(this)
                            })
                        }
                    }
                    else {
                        await this.contentRepo.checkForEdit({
                            id: after._id.toHexString(),
                            type: this.typeName
                        }, after.seo, {
                            type: this.typeName,
                            category: after?.category as string,
                            language: after?.language as string,
                            customFunc: this.customFunc
                        })
                    }

                }
                else {

                    if (after.isPublished) {
                        await this.publish(after._id,
                            {
                                category: this.typeName == "category" ? (after as any).catID : undefined
                            })
                    }

                    else if (after.publishDate != undefined) {
                        await schaduler.cancel({
                            name: `publishContent-${this.typeName}`,
                            "data.id": before._id.toString()
                        })

                        if (after.publishDate != undefined) {
                            await schaduler.schedule(after.publishDate as Date, `publishContent-${this.typeName}`, {
                                id: after._id.toString(),
                                publish: this.publish.bind(this)
                            })
                        }
                    }
                }
            }
            return res
        } catch (error) {
            throw error
        }
    }

    async findOneAndDelete(query: FilterQuery<T>): Promise<T | null> {
        try {
            const res = await super.findOneAndDelete(query)
            await this.contentRepo.findOneAndDelete({
                id: res?.id,
                type: this.typeName
            })
            return res
        } catch (error) {
            throw error
        }
    }

    // public 
    async refreshVideoProccess(before: T, after: T) {

    }

    async refreshImageProccess(before: T, after: T): Promise<any> {
        try {
            await this.changeMainImages(after)
            await this.proccessIncontentImages(after, before)
            await this.checkFileUses(after?._id.toString())
        } catch (error) {

            console.log(error)
        }

        return

    }

    async getContentDomian(id: Types.ObjectId) {
        let doc = await this.findById(id)
        if (doc == null) {
            return null
        }

        let language = await this.langRepo.findById(doc.language as string)
        if (language == null) {
            return null
        }

        let domain = language.domain != undefined ? await this.domainRepo.findById(language.domain as string) : this.domainRepo.findOne({
            isDefault: true
        })

        if (domain == null) {
            return null
        }

        return domain


    }

    // @addPublishLog
    async publishSubContent(id: Types.ObjectId, subId: Types.ObjectId) {
        try {
            let domain = await this.getContentDomian(id)



            if (domain == null) {
                throw new Error("دامنه یافت نشد")
            }


            let content = await this.contentRepo.findOne({
                type: this.typeName,
                id
            })
            if (content == null)
                throw new Error("محتوا یافت نشد")

            let url = ""

            var google_conf = await this.systemConfigRepo.getConfigValue("google_credential")
            var apiServer = await this.systemConfigRepo.getConfigValue("google_api_server")
            var apikey = await this.systemConfigRepo.getConfigValue("google_api_key")

            let webmasterToken = await this.googleApiTokenRepo.findOne({
                type: "webmaster",
                domains: domain._id
            })

            if (webmasterToken == null || google_conf == null || apiServer == null) {
                throw new Error("وب مستر متصل نشده است")
            }

            let webmaster_conf = webmasterToken.token



            if (content.url == "" || content.url.startsWith("/")) {
                url = `https://${domain.domain}${content.url}`
            }
            else {
                url = `https://${content.url}`
            }



            let response = await axios({
                method: 'post',
                url: apiServer + "users/webmaster/index",
                headers: {
                    "x-api-key": apikey
                },
                data: {
                    credential: google_conf,
                    token: webmaster_conf,
                    url
                }
            })

            return

        } catch (error) {
            throw error
        }
    }

    async publishCommentReply(commentId: Types.ObjectId, replyId: Types.ObjectId) {

        let fakeComment = await this.fakeCommentRepo.findById(commentId)

        if (fakeComment == null) {
            return
        }
        let doc = await this.findById(fakeComment.page)

        if (doc == null) {
            return
        }

        let comment = await this.commentRepo.findById(replyId)
        if (comment == null) {
            return
        }

        try {
            if (fakeComment.replyText != undefined && fakeComment.replyAdmin != undefined) {
                let newCommnet = await this.commentRepo.insert({
                    text: fakeComment.replyText,
                    page: fakeComment.page,
                    module: this.typeName,
                    level: 1,
                    language: doc.language as any,
                    adminReplied: fakeComment.replyAdmin,
                    reply: comment._id,
                    status: "confirmed",
                    type: "comment",
                    manual: true
                } as any)

            }
        } catch (error) {
            throw error
        }

    }

    async publishCommnet(commentId: Types.ObjectId) {
        let comment = await this.fakeCommentRepo.findById(commentId)

        if (comment == null) {
            return
        }
        let doc = await this.findById(comment.page)

        if (doc == null) {
            return
        }

        let newCommnet = await this.commentRepo.insert({
            text: comment.text,
            page: comment.page,
            module: this.typeName,
            level: 1,
            language: doc.language as any,
            userInfo: comment.userInfo,
            status: "confirmed",
            type: "comment",
            manual: true
        } as any)

        if (comment.replyText != undefined && comment.replyAdmin != undefined && comment.replyPublishAt) {
            let publishAt = comment.replyPublishAt
            let cycle = null

            if (comment.replyCycle != undefined) {
                cycle = await this.publishCycleRepo.findById(comment.replyCycle as Types.ObjectId)
                if (cycle != null) {
                    let times = cycle.time.split(":")
                    try {
                        publishAt.setHours(parseInt(times[0]))
                        publishAt.setMinutes(parseInt(times[1]))
                    } catch (error) {

                    }

                }
            }
            schaduler.schedule(publishAt, `publishCommentReply-${this.typeName}`, {
                replyId: newCommnet._id,
                commentId: commentId
            })

            let content = `
            <div>
                ${comment.replyText}
            </div>
            `
            await this.contentPublishQueueRepo.insert({
                pageType: comment.pageType,
                page: comment.page,
                type: "commentReply",
                subId: comment._id,
                content,
                contentLength: ArticleContentProccessor.getWordCount(content),
                date: publishAt,
                cycle: comment.cycle
            } as any)


        }

        // if(comment.ad)


        // if(doc == null || doc.comments == undefined || doc.comments.length == 0){
        //     return
        // }
        // let comment = doc.comments[0]


    }

    async publishCommnetReply(id: Types.ObjectId, commentId: Types.ObjectId) {

    }

    async publishCommonQuestion(id: Types.ObjectId, subId: Types.ObjectId) {

    }

    async checkSubContentUpdate(doc: BasePage) {
        let contents = doc.contents || []
        let id = doc._id

        let now = new Date()

        await this.contentPublishQueueRepo.deleteMany({
            page: id,
            pageType: this.typeName,
            type: "content",
            publishAt: {
                $gt: now
            }
        })

        let start
        let end

        for (let i = 0; i < contents.length; i++) {
            if (
                contents[i].type == "content"
            ) {

                let date = new Date()
                let publishAt = contents[i].publishAt

                if (publishAt != undefined && date < publishAt) {
                    let cycle = null
                    if (contents[i].cycle != undefined) {
                        cycle = await this.publishCycleRepo.findById(contents[i].cycle as Types.ObjectId)
                        if (cycle != null) {
                            let times = cycle.time.split(":")
                            try {
                                publishAt.setHours(parseInt(times[0]))
                                publishAt.setMinutes(parseInt(times[1]))
                            } catch (error) {

                            }

                        }
                    }

                    await this.contentPublishQueueRepo.insert({
                        pageType: this.typeName,
                        page: id,
                        type: "content",
                        subId: contents[i]._id,

                        content: contents[i].content || "",
                        contentLength: ArticleContentProccessor.getWordCount(contents[i].content || ""),

                        date: publishAt,
                        cycle: contents[i].cycle,
                    } as any)

                    if (start == undefined || start > publishAt) {
                        start = publishAt
                    }

                    if (end == undefined || end < publishAt) {
                        end = publishAt
                    }
                }


            }

        }

        await this.updateOne({
            _id: id
        }, {
            $set: {
                contetnUpdateStart: start,
                contetnUpdateEnd: end
            }
        })
    }



    async checkCommentUpdate(doc: BasePage) {
        let comments: any[] = []
        let id = doc._id

        let now = new Date()


        await this.contentPublishQueueRepo.deleteMany({
            page: id,
            pageType: this.typeName,
            type: "comment",
            publishAt: {
                $gt: now
            }
        })

        await schaduler.cancel({
            name: `publishComment-${this.typeName}`,
            "data.id": doc._id.toString()
        })



        let start
        let end

        for (let i = 0; i < comments.length; i++) {
            let date = new Date()
            let publishAt = comments[i].publishAt

            if (publishAt != undefined && date < publishAt) {
                let cycle = null
                if (comments[i].cycle != undefined) {
                    cycle = await this.publishCycleRepo.findById(comments[i].cycle as Types.ObjectId)
                    if (cycle != null) {
                        let times = cycle.time.split(":")
                        try {
                            publishAt.setHours(parseInt(times[0]))
                            publishAt.setMinutes(parseInt(times[1]))
                        } catch (error) {

                        }

                    }
                }


                if (start == undefined || start > publishAt) {
                    start = publishAt
                }

                if (end == undefined || end < publishAt) {
                    end = publishAt
                }


                schaduler.schedule(publishAt, `publishComment-${this.typeName}`, {
                    id: doc._id,
                    commentId: comments[i]._id
                })

                let content = `
                <div>
                    ${comments[i].text}
                </div>

                `

                await this.contentPublishQueueRepo.insert({
                    pageType: this.typeName,
                    page: id,
                    type: "comment",
                    subId: comments[i]._id,

                    content: content,
                    contentLength: ArticleContentProccessor.getWordCount(
                        content
                    ),

                    date: publishAt,
                    cycle: comments[i].cycle,
                } as any)
            }


        }

        await this.updateOne({
            _id: id
        }, {
            $set: {
                commentUpdateStart: start,
                commentUpdateEnd: end
            }
        })
    }


    async checkCommonQuestionUpdate(doc: BasePage) {
        let contents = doc.commonQuestions || []
        let id = doc._id

        let now = new Date()

        await this.contentPublishQueueRepo.deleteMany({
            page: id,
            pageType: this.typeName,
            type: "commonQuestions",
            publishAt: {
                $gt: now
            }
        })

        let start
        let end

        for (let i = 0; i < contents.length; i++) {
            let date = new Date()
            let publishAt = contents[i].publishAt

            if (publishAt != undefined && date < publishAt) {
                let cycle = null
                if (contents[i].cycle != undefined) {
                    cycle = await this.publishCycleRepo.findById(contents[i].cycle as Types.ObjectId)
                    if (cycle != null) {
                        let times = cycle.time.split(":")
                        try {
                            publishAt.setHours(parseInt(times[0]))
                            publishAt.setMinutes(parseInt(times[1]))
                        } catch (error) {

                        }

                    }
                }

                let content = `
                <div >

                <div >
                ${contents[i].question} 
                </div>
                ${contents[i].answer}
                </div>
                `

                await this.contentPublishQueueRepo.insert({
                    pageType: this.typeName,
                    page: id,
                    type: "commonQuestions",
                    subId: contents[i]._id,

                    content: content,
                    contentLength: ArticleContentProccessor.getWordCount(
                        content
                    ),

                    date: publishAt,
                    cycle: contents[i].cycle,
                } as any)

                if (start == undefined || start > publishAt) {
                    start = publishAt
                }

                if (end == undefined || end < publishAt) {
                    end = publishAt
                }
            }

        }

        await this.updateOne({
            _id: id
        }, {
            $set: {
                commonQuestionUpdateStart: start,
                commonQuestionUpdateEnd: end
            }
        })
    }



    async doOnPublish(id: Types.ObjectId | string) {
        let doc = await this.findById(id)
        if (doc == null || doc.contents == undefined || doc.contents.length == 0) {
            return
        }
        try {
            this.checkSubContentUpdate(doc)
            // schaduler.cancel({
            //     name: `publishSubContent-${this.typeName}`,
            //     "data.id": doc._id.toString()
            // })

            // await this.contentPublishQueueRepo.findOneAndDelete({
            //     page : id ,
            //     pageType : this.typeName
            // })

            // let toPublish :any[]=[]
            // for (let i = 0; i < contents.length; i++) {
            //     if (
            //         contents[i].type == "content"
            //     ) {

            //         let date = new Date()
            //         let publishAt = contents[i].publishAt

            //         if (publishAt != undefined && date < publishAt) {
            //             schaduler.schedule(publishAt, `publishSubContent-${this.typeName}`, {
            //                 id: id.toString(),
            //                 subId: contents[i]._id.toString(),
            //             })
            //             toPublish.push({
            //                 date : publishAt,
            //                 subId : contents[i]._id
            //             })
            //         }

            //     }

            // }
            // await this.contentPublishQueueRepo.insert({
            //     page : id ,
            //     pageType : this.typeName,
            //     toPublish

            // } as any)
        } catch (error) {
            throw error
        }

        // await schaduler.schedule(after.publishDate as Date, `publishContent-${this.typeName}`, {
        //     id: after._id.toString(),
        //     publish: this.publish.bind(this)
        // })
    }

    async doOnUnPublish(id: Types.ObjectId | string) {

    }

    public async replace(query: FilterQuery<T>, document: T): Promise<any> {
        try {
            var doc = await this.findOne(query)


            //replace
            await this.deleteById(doc?._id)
            document._id = doc?._id
            if (doc?.isPublished) {
                if (document.isPublished) {
                    document.publishDate = doc.publishDate
                }
            }
            document.modifyDate = new Date()

            var newDoc = await this.collection.create(document)
            await this.refreshCache(query)


            await this.checkFileUses(newDoc?._id.toString())

            if (doc?.isPublished) {
                if (newDoc?.isPublished) {

                    this.refreshImageProccess(doc, newDoc)

                    let d = this.contentRepo.checkForEdit({
                        id: newDoc._id.toHexString(),
                        type: this.typeName
                    }, newDoc.seo, {
                        type: this.typeName,
                        category: newDoc?.category as string,
                        language: newDoc?.language as string,
                        customFunc: this.contentFunc
                    })
                    this.updateOne({
                        _id: doc._id
                    }, {
                        $set: {
                            seoContent: doc.seoContent || (await d as any)?._id
                        }
                    })

                    this.doOnPublish(newDoc?._id)

                }
                else {
                    await this.unPublish(newDoc?._id)
                    await this.insertToSeoDraft(newDoc)
                    if (newDoc?.publishDate != undefined) {
                        await schaduler.schedule(document.publishDate as Date, `publishContent-${this.typeName}`, {
                            id: newDoc?._id.toString(),
                            publish: this.publish.bind(this)
                        })
                    }

                }
            }
            else {
                if (newDoc?.isPublished) {
                    await this.publish(doc?._id, {
                        category: this.typeName == "category" ? (newDoc as any).catID : undefined
                    })
                }
                else {
                    await this.insertToSeoDraft(newDoc)
                    if (newDoc?.publishDate != undefined) {
                        await schaduler.cancel({
                            name: `publishContent-${this.typeName}`,
                            "data.id": doc?._id
                        })
                        await schaduler.schedule(document.publishDate as Date, `publishContent-${this.typeName}`, {
                            id: newDoc?._id.toString(),
                            publish: this.publish.bind(this)
                        })
                    }
                }

            }
            return newDoc

            // if (doc != null) {
            //     await this.checkFileUses(doc?._id.toString())
            //     if (doc?.publishDate != document.publishDate) {
            //         await schaduler.cancel({
            //             name: `publishContent-${this.typeName}`,
            //             "data.id": doc?._id
            //         })
            //         if(doc.isPublished ==  true){
            //             await this.unPublish(doc._id)
            //             this.insertToSeoDraft(newDoc)
            //         }

            //         if (document.publishDate != undefined) {
            //             await schaduler.schedule(document.publishDate as Date, `publishContent-${this.typeName}`, {
            //                 id: doc?._id.toString(),
            //                 publish: this.publish.bind(this)
            //             })
            //         } 

            //     }
            //     if (document.publishDate == undefined && document.isPublished == true) {
            //         return await this.publish(doc?._id,{
            //             category: this.typeName == "category" ? (newDoc as any).catID : undefined
            //         })
            //     }
            //     else {
            //         this.insertToSeoDraft(newDoc)
            //     }
            // }
            // return
        } catch (error) {
            throw error
        }
    }

    public async getVideosDoc(doc: T) {
        try {
            let videoIds = this.getVideos(doc, true)
            let videos = await this.videoRepo.findAll({
                _id: videoIds
            })

            return videos

        } catch (error) {
            throw error
        }
    }

    public async doFindFiles(doc: T): Promise<string[]> {
        let files = doc?.fileUses || []
        // doc.mainImage ? files.push(doc.mainImage) : true

        // if (doc.files)
        //     files.push(...doc?.files)

        // if (doc.videos)
        //     files.push(... (doc.videos.map((elem: any) => {
        //         return elem.mainSrc
        //     })) as string[])

        if (doc.video != undefined) {
            try {
                const video = await this.videoRepo.findById(doc.video as string)
                // let paths= 
                if (video != null) {
                    // console.log("sec", video?.src)
                    files.push(video?.src)
                    let otherPaths = video.result.map((p) => p.path)
                    // console.log("otherPaths", otherPaths)
                    files.push(...otherPaths)
                }

            } catch (error) {

            }
        }
        if (doc.seo?.social) {
            try {
                for (let i = 0; i < doc.seo?.social.length; i++) {
                    if (doc.seo?.social[i].image) {
                        files.push(doc.seo?.social[i].image)
                    }
                }
            } catch (error) {

            }
        }
        return files
    }

    public async checkFileUses(id: string) {

        var doc = await this.findById(id)
        if (doc == null)
            return
        var files: string[] = await this.doFindFiles(doc)
        return this.fileUsesRepo.makeChangeFileUses(id, files, this.typeName)
    }

    async isUrlExists(url: string, isStatic: boolean = false, config: InsertOptions, id?: string) {
        try {
            config.type = this.typeName
            config.customFunc = this.contentFunc
            const finaURL = await this.contentRepo.makeURL(url, isStatic, config)
            // console.log("finaURL" , finaURL)
            let q: any = {
                url: finaURL
            }
            if (id != undefined) {
                q["id"] = {
                    "$ne": id
                }
            }

            return await this.contentRepo.isUrlExists(finaURL, id) || this.seoDraftRepo.isExists(q)

        } catch (error) {
            // console.log(error)
            throw error
        }
    }

    public async findByIdAndUpdate(id: Types.ObjectId | string, queryData: UpdateQuery<T>): Promise<T | null> {
        try {
            // if(queryData)
            var before = await this.findById(id, { fromDb: true })
            var res = await super.findByIdAndUpdate(id, queryData)
            var after = await this.collection.findById(id)


            if (before != null && after != null) {
                if (before.isPublished) {
                    if (!after.isPublished) {
                        await this.unPublish(after._id)
                        if (after.publishDate != undefined) {
                            await schaduler.schedule(after.publishDate as Date, `publishContent-${this.typeName}`, {
                                id: after._id.toString(),
                                publish: this.publish.bind(this)
                            })
                        }
                        else {
                            await this.insertToSeoDraft(after)
                        }
                    }
                    else {
                        after.seo["id"] = after._id.toHexString()
                        await this.contentRepo.checkForEdit({
                            id: after._id.toHexString(),
                            type: this.typeName
                        }, after.seo, {
                            type: this.typeName,
                            category: after?.category as string,
                            language: after?.language as string,
                            customFunc: this.contentFunc
                        })
                    }

                }
                else {

                    if (after.isPublished) {
                        await this.publish(after._id, {
                            category: this.typeName == "category" ? (after as any).catID : undefined
                        })
                    }

                    else if (after.publishDate != undefined) {
                        await schaduler.cancel({
                            name: `publishContent-${this.typeName}`,
                            "data.id": before._id.toString()
                        })

                        if (after.publishDate != undefined) {
                            await schaduler.schedule(after.publishDate as Date, `publishContent-${this.typeName}`, {
                                id: after._id.toString(),
                                publish: this.publish.bind(this)
                            })
                        }
                    }
                    else {
                        await this.insertToSeoDraft(after)
                    }
                }
            }
            return res
        } catch (error) {
            throw error
        }
    }

    async getExtra(doc: T) {
        return doc
    }


    fetchContents(doc: T) {

        let contents: string[] = []

        if (doc.contents == undefined) {
            return []
        }

        for (let i = 0; i < doc.contents.length; i++) {

            contents.push(doc.contents[i].content || "")

        }
        return contents

    }


    async proccessContentImages(content: string, domainImage: any, savePath: any, images: {
        src: string | null;
        width: string | null;
        original: string | null;
    }[], contentNumber?: number) {

        try {
            for (let i = 0; i < images.length; i++) {

                if (images[i].src == null) {
                    continue
                }
                if (images[i].width != null) {
                    try {
                        if (domainImage["nonConvert-Suffixs"].includes(path.extname(images[i].src || " ").substring(1))) {

                            let res = await ImageProccessesor.resizeAndRename("temp/", images[i].original || images[i].src as string, {
                                mobile: false,
                                q: domainImage["compress-quality"] as number,
                                suffixs: [path.extname(images[i].src || " ").substring(1)],
                                x: parseInt(images[i].width as string),
                                watermark: domainImage["watermark-config"]
                            })

                            for (let z = 0; z < res.length; z++) {
                                var destinationPath = res[z].split("/")
                                let file = res[z]
                                res[z] = await this.cdn.upload(
                                    res[z],
                                    (await getPathResolver("image", savePath.path, domainImage["image-addressing"], contentNumber)()) +
                                    destinationPath[destinationPath.length - 1],
                                )


                                try {
                                    await DiskFileManager.removeFile(file)
                                } catch (error) {

                                }

                            }


                            content = this.changeUrlSetting(content, {
                                mobile: false,
                                newSrc: res,
                                src: images[i].src || "",
                                original: images[i].original
                            })

                            let mobileRes
                            if (domainImage["make-phone-image"]) {
                                mobileRes = await ImageProccessesor.resizeAndRename("temp/", images[i].original || images[i].src as string, {
                                    mobile: true,
                                    q: domainImage["compress-quality"] as number,
                                    suffixs: [path.extname(images[i].src || " ").substring(1)],
                                    x: Math.min(parseInt(images[i].width as string), domainImage['phone-width']),
                                    watermark: domainImage["watermark-config"]
                                })

                                for (let z = 0; z < mobileRes.length; z++) {
                                    var destinationPath = mobileRes[z].split("/")
                                    let file = mobileRes[z]
                                    mobileRes[z] = await this.cdn.upload(
                                        mobileRes[z],
                                        (await getPathResolver("image", savePath.path, domainImage["image-addressing"], contentNumber)()) +
                                        destinationPath[destinationPath.length - 1],
                                    )

                                    try {
                                        await DiskFileManager.removeFile(file)
                                    } catch (error) {

                                    }


                                }

                           

                                content = this.changeUrlSetting(content, {
                                    mobile: true,
                                    newSrc: mobileRes,
                                    src: images[i].src || "",
                                    original: images[i].original
                                })
                            }

                        }

                        else {
                            let imageSuffix = domainImage["image-result-Suffixs"]
                            let res = await ImageProccessesor.resizeAndRename("temp/", images[i].original || images[i].src as string, {
                                mobile: false,
                                q: domainImage["compress-quality"] as number,
                                suffixs: imageSuffix,
                                x: parseInt(images[i].width as string),
                                watermark: domainImage["watermark-config"]
                            })


                            for (let z = 0; z < res.length; z++) {
                                var destinationPath = res[z].split("/")
                                let file = res[z]
                                res[z] = await this.cdn.upload(
                                    res[z],
                                    (await getPathResolver("image", savePath.path, domainImage["image-addressing"], contentNumber)()) +
                                    destinationPath[destinationPath.length - 1],
                                )

                                try {
                                    await DiskFileManager.removeFile(file)
                                } catch (error) {

                                }
                            }

                           

                            content = this.changeUrlSetting(content, {
                                mobile: false,
                                newSrc: res,
                                src: images[i].src || "",
                                original: images[i].original
                            })

                        


                            let mobileRes
                            if (domainImage["make-phone-image"]) {
                                mobileRes = await ImageProccessesor.resizeAndRename("temp/", images[i].original || images[i].src as string, {
                                    mobile: true,
                                    q: domainImage["compress-quality"] as number,
                                    suffixs: imageSuffix,
                                    x: Math.min(parseInt(images[i].width as string), domainImage['phone-width']),
                                    watermark: domainImage["watermark-config"]
                                })


                                for (let z = 0; z < mobileRes.length; z++) {
                                    var destinationPath = mobileRes[z].split("/")
                                    let file = mobileRes[z]
                                    mobileRes[z] = await this.cdn.upload(
                                        mobileRes[z],
                                        (await getPathResolver("image", savePath.path, domainImage["image-addressing"], contentNumber)()) +
                                        destinationPath[destinationPath.length - 1],
                                    )

                                    try {
                                        await DiskFileManager.removeFile(file)
                                    } catch (error) {

                                    }
                                }

                                content = this.changeUrlSetting(content, {
                                    mobile: true,
                                    newSrc: mobileRes,
                                    src: images[i].src || "",
                                    original: images[i].original
                                })
                            }

                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

            return content
        }
        catch (error) {
            throw error
        }
    }


    public async changeMainImages(doc: T) {
        try {
            let lang = await this.langRepo.findById(doc.language as string)

            if (lang?.domain) {
                var domain = await this.domainRepo.findById(lang.domain as string)
            }
            else {
                var domain = await this.domainRepo.findOne({
                    isDefault: true
                })
            }

            let domainImage = await this.domainImageRepo.findOne({
                domain: domain?._id
            }, {}, [{
                path: "watermark-config"
            }])


            if (domainImage == null) {
                return
            }

            let savePath = domainImage?.["upload-path"]
            var conf = await this.cdnRepo.findById(savePath.fileManager)


            if (conf == null) {
                var conf = await this.cdnRepo.findOne({
                    isDefaultContent: true,
                });
            }

            if (doc?.resolutionConfig) {
                let config = await this.templateConfigRepo.findOne({
                    template: doc.template,
                    language: doc.language
                })
                if (config == null)
                    config = await this.templateConfigRepo.findOne({
                        template: doc.template
                    })

                if (config == null)
                    config = await this.templateConfigRepo.findOne({
                    })




                let res = await ImageProccessesor.proccessFromConfig(ConfigService.getConfig("staticRoute"), doc.resolutionConfig.source
                    , config?.imageConfig as any, doc.resolutionConfig.conf)



                var cdn = new CDN_Manager()


                if (conf != null)
                    cdn.initFromConfig({
                        config: conf.config,
                        hostUrl: conf.hostUrl || "",
                        id: conf._id,
                        type: conf.type
                    })

                let c = [{
                    name: "main",
                    path: doc.resolutionConfig.source
                }]

                c.push(...res)

                res = c

                let temp_dir = ""
                if (domainImage["watermark-main"]) {
                    let temp_name = Date.now().toString()
                    await DiskFileManager.mkdir("src/uploads/tmp/", temp_name)

                    temp_dir = `src/uploads/tmp/${temp_name}/`
                    let wm = await this.watermarkConfigRepo.findById(domainImage["main-watermark-config"] as string)
                    if (wm != null) {
                        for (let i = 0; i < res.length; i++) {
                            res[i]["path"] = await ImageProccessesor.makeWatermarks(res[i]["path"], [...wm.configs], temp_dir)
                        }
                    }
                }


                for (let i = 0; i < res.length; i++) {
                    let name = path.basename(doc.resolutionConfig.source).split(".")[0]
                    const finalPath = getUploadDestination(domainImage["upload-path"].path, domainImage["image-addressing"], doc.contentNumber) + res[i].name + "_" + name + path.extname(res[i].path)
                    // res[i].path = await cdn.uploadMany(res[i].path, finalPath)
                    let r = await cdn.uploadMany([
                        {
                            path: res[i].path,
                            destination: finalPath
                        }
                    ], {
                        rename: true
                    })
                    res[i].path = r[0]
                }
                if (temp_dir != "") {
                    await DiskFileManager.removeFolder(temp_dir)
                }
          


                await this.collection.updateOne({
                    _id: doc._id
                }, {
                    $set: {
                        imageConfig: res,
                        imageProccessed: true
                    },
                })
            }

        }
        catch (error) {
            console.log("error")
        }
    }

    public async proccessIncontentImages(
        after: T,
        before?: T
    ) {
        let lang = await this.langRepo.findById(after.language as string)

        if (lang?.domain) {
            var domain = await this.domainRepo.findById(lang.domain as string)
        }
        else {
            var domain = await this.domainRepo.findOne({
                isDefault: true
            })
        }

        let domainImage = await this.domainImageRepo.findOne({
            domain: domain?._id
        },
            {

            }, [
            {
                path: "watermark-config"
            }
        ])



        if (domainImage == null) {
            return
        }




        let savePath = domainImage?.["upload-path"]
        var conf = await this.cdnRepo.findById(savePath.fileManager)

        if (conf == null) {
            var conf = await this.cdnRepo.findOne({
                isDefaultContent: true
            });
        }

        if (conf == null)
            return


        let contentsBefore = before ? this.fetchContents(before) : []
        let imagesBefore = []
        for (let i = 0; i < contentsBefore.length; i++) {

            imagesBefore.push(...await this.extractImageUrls(contentsBefore[i]))
        }



        let contents = after.contents || []


        for (let i = 0; i < contents.length; i++) {
            let imagesAfter = await this.extractImageUrls(contents[i].content || "")

            let images: any[] = []
            for (let z = 0; z < imagesAfter.length; z++) {
                let exists = false
                let newImage = true
                for (let j = 0; j < imagesBefore.length; j++) {

                    if (imagesAfter[z].src == imagesBefore[j].src && newImage) {
                        newImage = false
                    }
                    if (imagesAfter[z].src == imagesBefore[j].src &&
                        imagesAfter[z].width != null && imagesBefore[j].width != null
                        && imagesAfter[z].width != imagesBefore[j].width
                    ) {
                        exists = true
                        if (imagesAfter[z].original != null) {
                            images.push(
                                {
                                    original: imagesAfter[z].original,
                                    src: imagesAfter[z].original,
                                    width: imagesAfter[z].width
                                }
                            )
                        }
                        break
                    }
                }

                if (exists == true) {
                    images.push({
                        src: imagesAfter[z].src,
                        width: imagesAfter[z].width
                    })
                }

                // if (newImage) {
                images.push({
                    src: imagesAfter[z].src,
                    width: imagesAfter[z].width
                })
                // }



            }
            contents[i].content = await this.proccessContentImages(contents[i].content || "", domainImage, savePath, images)

        }

        await this.updateOne({
            _id: after._id
        }, {
            $set: {
                contents
            }
        })
    }


    async proccessImageAfterPublish(doc: T) {

        try {
            await this.changeMainImages(doc)
            await this.proccessIncontentImages(doc)
            await this.checkFileUses(doc?._id.toString())
        } catch (error) {

            console.log(error)
        }

    }


    changeUrlSetting(content: string, options: {
        src: string,
        newSrc: string[],
        mobile: boolean,
        original?: string | null
    }) {
        // console.log(content, options)
        let html =
            `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div id="content"></div>
        </body>
        </html>
`
        const { window } = new JSDOM(html);
        const { document } = window;
        let contentElem = document.getElementById("content")
        if (contentElem != null)
            contentElem.innerHTML = content

        let sorts = ["jpg", "webp"]
        let mainIndex = 0

        let b = false
        for (let i = 0; i < sorts.length; i++) {
            for (let j = 0; j < options.newSrc.length; j++) {
                if (options.newSrc[j].endsWith(sorts[i])) {
                    mainIndex = j
                    b = true
                    break

                }
            }
            if (b) {
                break
            }
        }

        let imgs = document.querySelectorAll('img')
        for (let i = 0; i < imgs.length; i++) {
            let img = imgs[i]

            if (img.src == options.src || (options.mobile && img.getAttribute("original") == options.src)) {
                if (options.mobile) {
                    for (let j = 0; j < options.newSrc.length; j++) {
                        if (j == mainIndex) {
                            img.setAttribute('main-mb', options.newSrc[j]);
                        }
                        else {
                            img.setAttribute(path.extname(options.newSrc[j]).substring(1) + "-mb", options.newSrc[j]);
                        }

                    }
                }
                else {
                    img.setAttribute('original', options.original || options.src);
                    for (let j = 0; j < options.newSrc.length; j++) {
                        if (j == mainIndex) {
                            img.src = options.newSrc[j];
                        }
                        else {
                            img.setAttribute(path.extname(options.newSrc[j]).substring(1), options.newSrc[j]);
                        }

                    }
                }
            }
        };

        return document.getElementById("content")?.innerHTML || ""
    }

}



