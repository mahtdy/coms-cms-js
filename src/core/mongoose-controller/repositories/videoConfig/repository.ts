import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import VideoConfig, { VideoConfigModel } from "./model";




export default class VideoConfigRepository extends BaseRepositoryService<VideoConfig>{
    constructor(options?: RepositoryConfigOptions) {
        super(VideoConfigModel, options)
    }
}