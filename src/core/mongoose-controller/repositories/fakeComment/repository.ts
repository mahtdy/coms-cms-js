import ArticleContentProccessor from "../../../services/articleProccessing";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository"
import FakeComment, { FakeCommentModel } from "./model";
import schaduler from "../../../services/queue";
import { Types, UpdateQuery } from "mongoose";
import PublishCycleRepository from "../publishCycle/repository";
import ContentPublishQueueRepository from "../contentPublishQueue/repository";


export default class FakeCommentRepository extends BaseRepositoryService<FakeComment>{
    publishCycleRepo: PublishCycleRepository
    contentPublishQueueRepo: ContentPublishQueueRepository


    constructor(options?: RepositoryConfigOptions) {
        super(FakeCommentModel, options)
        this.publishCycleRepo = new PublishCycleRepository()
        this.contentPublishQueueRepo = new ContentPublishQueueRepository()
    }


    async insert(document: FakeComment, options?: any): Promise<any> {
        try {
            let doc = (await super.insert(document, options) as FakeComment)
            console.log("insert" , doc)
            if(doc != null && doc.status == "confirmed"){
                let publishAt = doc.publishAt

                let cycle = null
                if (doc.cycle != undefined) {
                    cycle = await this.publishCycleRepo.findById(doc.cycle as Types.ObjectId)
                    if (cycle != null) {
                        let times = cycle.time.split(":")
                        try {
                            publishAt.setHours(parseInt(times[0]))
                            publishAt.setMinutes(parseInt(times[1]))
                        } catch (error) {

                        }

                    }
                }

                
                await schaduler.schedule(publishAt, `publishComment-${doc.pageType}`,{
                    commentId : doc._id
                })  

                let content = `
                <div>
                    ${doc.text}
                </div>

                `
                await this.contentPublishQueueRepo.insert({
                    pageType : doc.pageType,
                    page : doc.page,
                    type : "comment",
                    subId : doc._id,
                    content : doc.text,
                    contentLength :  ArticleContentProccessor.getWordCount(content),
                    date : publishAt,
                    cycle : doc.cycle
                } as any)

            }
            return doc
        } catch (error) {
            throw error
        }
    }


    async findByIdAndUpdate(id: string | Types.ObjectId, query: UpdateQuery<FakeComment>): Promise<FakeComment | null> {
        try {
            return super.findByIdAndUpdate(id, query)
        } catch (error) {
            throw error
        }
    }

    
    async deleteById(id: string | Types.ObjectId): Promise<any> {
        // console.log("delete")
        try {
            let r = await super.deleteById(id)

            await schaduler.cancel({
                "data.commentId": id 
            })  

            return r
        } catch (error) {
            throw error
        }
    }


    async checkCommentUpdate(doc: FakeComment) {
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


    async confirm() {

    }

    async reject() {

    }




}


