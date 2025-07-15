import { Document } from "mongoose";
import BaseRepositoryService from "./repository";


interface Repo {
    name: string,
    repo: BaseRepositoryService<Document>
}

export default class VideoRegistry {
    private static instance: VideoRegistry;
    repos: Repo[]
    constructor() {
        this.repos = []
    }


    public static getInstance(): VideoRegistry {
        if (!VideoRegistry.instance) {
            VideoRegistry.instance = new VideoRegistry();

        }
        return VideoRegistry.instance;

    }

    public async add(item: Repo) {
        let exists = this.get(item.name)
        if (exists)
            return

        // console.log("item" , item.name)
        VideoRegistry.instance.repos.push(item)
        // console.log(await ContentMaduleRegistry.instance.madules[0].repo?.findAll({}))
    }

    // getRepository
    get(name: string): Repo | undefined {
        var index = this.repos.findIndex((value, index) => {
            return value.name == name
        })

        if (index != -1)
            return this.repos[index]

        return
    }

}