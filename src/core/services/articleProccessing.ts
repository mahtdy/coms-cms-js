import { JSDOM } from "jsdom"
// import KeyWordRepository from "./repository/keyWord"
// import LinkDomainRepository from "./repository/linkDomain"
// import ArticleRepository from "./repository/article"
// import KeyWord from "../database/models/keyWord";
import { Types } from "mongoose";
// const { convert } = require('html-to-text');

interface KeyWordProccessResult {
    data: any;
    content: string
}

interface BackLinkList {
    url: string,
    text: string,
    isExists?: boolean,
    isFollow?: boolean,

}

export default class ArticleContentProccessor {
    constructor() {

    }

    static async testBackLink(url: string, links: BackLinkList[]) {
        try {
            var dom = await JSDOM.fromURL(url)
        } catch (error) {
            throw error
        }
        var result: any[] = []

        var tags = dom.window.document.getElementsByTagName("a")
        var data: any = {}

        var urlLinks: BackLinkList[] = []
        for (let j = 0; j < tags.length; j++) {
            for (let i = 0; i < links.length; i++) {
                if (links[i].url == tags[j].href) {
                    var isFollow = true
                    if (tags[j].rel.indexOf("nofollow") != -1) {
                        isFollow = false
                    }
                    urlLinks.push({
                        url: tags[j].href,
                        text: tags[j].textContent || "",
                        isFollow
                    })
                }
            }
        }
        for (let i = 0; i < links.length; i++) {
            for (let j = 0; j < urlLinks.length; j++) {
                console.log(urlLinks[j].text)
                if (links[i].url == urlLinks[j].url &&
                    links[i].text == urlLinks[j].text
                ) {
                    links[i].isExists = true
                    links[i].isFollow = urlLinks[j].isExists
                    urlLinks.slice(j, 1)
                    break
                }
            }
        }
        return {
            links: links,
            extra: urlLinks
        }
    }


    static getImages(content : string){
        const dom = new JSDOM(content);
        let links = dom.window.document.querySelectorAll("a")
        let images = dom.window.document.querySelectorAll("img")
        let files :any[] = []
        for (let i = 0; i < images.length; i++) {
            let link = images[i].getAttribute("src")
            files.push( {
               url : (link as string)
            })

            let formats = ["webp", "png", "jpg", "jpeg"]
            for (let j = 0; j < formats.length; j++) {
                if (images[i].getAttribute(formats[j]) != null) {
                    // files.push(link as string)
                    files.push( {
                        url : images[i].getAttribute(formats[j])
                     })
                }
                if (images[i].getAttribute(formats[j]+ "-mb") != null) {
                    // files.push(link as string)
                    files.push( {
                        url : images[i].getAttribute(formats[j]+ "-mb")
                    })
                }
            }
            if (images[i].getAttribute("main-mb") != null) {
                files.push({
                    url : images[i].getAttribute("main-mb")
                })
            }

        }
        return files
    }


    static getContentFiles(content: string) {
        const dom = new JSDOM(content);
        let links = dom.window.document.querySelectorAll("a")

        let files: string[] = []
        for (let i = 0; i < links.length; i++) {
            let link = links[i].getAttribute("href")
            var urlParts = link?.split("/")
            if (urlParts && urlParts.length > 0 && urlParts[urlParts.length - 1].includes("."))
                files.push(link as string)
        }

        let images = dom.window.document.querySelectorAll("img")
        for (let i = 0; i < images.length; i++) {
            let link = images[i].getAttribute("src")
            files.push(link as string)

            let formats = ["webp", "png", "jpg", "jpeg"]
            for (let j = 0; j < formats.length; j++) {
                if (images[i].getAttribute(formats[j]) != null) {
                    files.push(images[i].getAttribute(formats[j]) as string)
                }
                if (images[i].getAttribute(formats[j]+ "-mb") != null) {
                    files.push(images[i].getAttribute(formats[j]+ "-mb") as string)
                }
            }
            if (images[i].getAttribute("main-mb") != null) {
                files.push(images[i].getAttribute("main-mb") as string)
            }

        }
        return files
    }

    static getWordCount(html :string) {
        // Parse the HTML using jsdom
        const dom = new JSDOM(html);
        
        // Extract the text content of the entire document
        const textContent = dom.window.document.body.textContent || "";
        
        // Remove extra whitespace and split by spaces to count words
        const wordCount = textContent.trim().split(/\s+/).length;
        
        return wordCount;
      }

    // static async proccess(content: string, articleId: Types.ObjectId): Promise<any> {

    //     var dom = new JSDOM(content)
    //     var res = this.proccess_H_Tags(dom)
    //     res["content"] = await this.proccessContent(dom)
    //     var result = await this.proccessKeyWords(content, dom, res["content"]["words"])
    //     res["keyWords"] = result.data


    //     try {
    //         var articleRepository = new ArticleRepository()
    //         articleRepository.findByIdAndUpdate(articleId, {
    //             $set: {
    //                 content: result.content
    //             }
    //         })
    //     } catch (error) {
    //         throw error
    //     }
    //     try {
    //         res["image"] = await this.proccessImage(dom)
    //     } catch (error) {
    //         throw error
    //     }
    //     res["video"] = await this.proccessVideo(dom)
    //     res["a"] = this.proccess_A_Tags(dom)
    //     return res
    // }

    // private static proccess_H_Tags(dom: JSDOM): any {
    //     var outPut: any = {}

    //     for (let i = 1; i < 7; i++) {
    //         var tags = dom.window.document.getElementsByTagName(`h${i}`)
    //         var data: any = {}
    //         data["count"] = tags.length
    //         data["values"] = []
    //         for (let j = 0; j < tags.length; j++) {
    //             data["values"].push(tags[j].textContent)
    //         }
    //         outPut[`h${i}`] = data
    //     }
    //     return outPut
    // }

    // private static async proccessImage(dom: JSDOM): Promise<any> {
    //     var images = dom.window.document.getElementsByTagName("img")
    //     var data: any = {}
    //     data["count"] = images.length
    //     data["values"] = []
    //     var noalts: number = 0
    //     for (let j = 0; j < images.length; j++) {
    //         // var response = await axios.get(images[j].src)
    //         // var length = response.headers["content-length"]
    //         var info: any = {
    //             src: images[j].src,
    //             // length: length,
    //             haveAlt: true
    //         }
    //         console.log(images[j].alt)
    //         if (images[j].alt == undefined) {
    //             info["haveAlt"] = false
    //             noalts += 1
    //         }
    //         data["values"].push(info)
    //     }
    //     data["haveAlt"] = images.length - noalts
    //     data["have'ntAlt"] = noalts
    //     return data
    // }

    public static async proccessVideo(dom: JSDOM): Promise<any> {
        var videos = dom.window.document.getElementsByTagName("video")
        var data: any = {}
        data["count"] = videos.length
        data["values"] = []
        for (let j = 0; j < videos.length; j++) {
            // var response = await axios.get(videos[j].src)
            // var length = response.headers["content-length"]
            data["values"].push({
                src: videos[j].src,
                length: 0
            })
        }
        return data
    }

    // public static editVideo(content: string, oldSrc: string, newSrc: string): string {

    //     var dom = new JSDOM(content)
    //     var videos = dom.window.document.getElementsByTagName("video")
    //     for (let j = 0; j < videos.length; j++) {
    //         if (videos[j].src == oldSrc) {
    //             videos[j].src == newSrc
    //         }
    //     }
    //     var str = dom.serialize()
    //     return str
    // }

    // private static proccess_A_Tags(dom: JSDOM): Promise<any> {
    //     var tags = dom.window.document.getElementsByTagName("a")
    //     var data: any = {}
    //     data["count"] = tags.length
    //     var internal = []
    //     var external = []
    //     var PATTERN_FOR_EXTERNAL_URLS = /^(\w+:)?\/\//;
    //     for (let j = 0; j < tags.length; j++) {
    //         var isFollow = true
    //         if (tags[j].rel.indexOf("nofollow") != -1) {
    //             isFollow = false
    //         }
    //         if (tags[j].href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1) {
    //             external.push({
    //                 link: tags[j].href,
    //                 isFollow: isFollow
    //             })
    //         }
    //         else {
    //             internal.push({
    //                 link: tags[j].href,
    //                 isFollow: isFollow
    //             })
    //         }
    //     }
    //     data["internal"] = internal
    //     data["external"] = external
    //     return data
    // }

    // private static async proccessContent(dom: JSDOM) {
    //     var data: any = {}
    //     var body = dom.window.document.getElementsByTagName("body")[0]
    //     var text = body.textContent as string;
    //     text = text.replace(/(^\s*)|(\s*$)/gi, "");
    //     text = text.replace(/[ ]{2,}/gi, " ");
    //     text = text.replace(/\n /, "\n");

    //     data["words"] = text.split(" ").length
    //     var sentences = text.split(".")
    //     var sentenceList: any[] = []
    //     for (let i = 0; i < sentences.length; i++) {
    //         var sentenceInfo: any = {}
    //         text = sentences[i];
    //         sentenceInfo["words"] = text.split(" ").length
    //         sentenceInfo["content"] = text
    //         sentenceList.push(sentenceInfo)
    //     }
    //     data["sentences"] = {
    //         count: sentences.length,
    //         list: sentenceList
    //     }


    //     var paragaphs = dom.window.document.getElementsByTagName("p")
    //     var paragaphList: any[] = []
    //     for (let i = 0; i < paragaphs.length; i++) {
    //         var paragraphInfo: any = {}
    //         text = paragaphs[i].textContent as string;
    //         text = text.replace(/(^\s*)|(\s*$)/gi, "");
    //         text = text.replace(/[ ]{2,}/gi, " ");
    //         text = text.replace(/\n /, "\n");
    //         paragraphInfo["words"] = text.split(" ").length
    //         paragraphInfo["content"] = text
    //         paragaphList.push(paragraphInfo)
    //     }
    //     data["paragaphs"] = {
    //         count: paragaphs.length,
    //         list: paragaphList
    //     }


    //     return data
    // }

    // private static async proccessKeyWords(content: string, dom: JSDOM, wordsCount: number): Promise<KeyWordProccessResult> {
    //     var data: any = {};

    //     try {
    //         var keyWordRepository = new KeyWordRepository()
    //         var keyWords = await keyWordRepository.findMany({}, {
    //             sort: {
    //                 importance: 1
    //             }
    //         })
    //     } catch (error) {
    //         throw error
    //     }



    //     var body = dom.window.document.getElementsByTagName("body")[0]
    //     var text = convert(content, {
    //         wordwrap: 130
    //     });
    //     text = text.replace(/\n/, " ");
    //     texts = text.split("\n")
    //     text = texts.join(" ")
    //     var texts = text.split(" ")
    //     var textLength = texts.length
    //     var totalNumbers = 0

    //     var l_DRepository = new LinkDomainRepository()
    //     var linkNumbers = 0

    //     try {
    //         var linkDomain = await l_DRepository.findOne({
    //             $and: [
    //                 {
    //                     from: {
    //                         $lte: textLength
    //                     }
    //                 },
    //                 {
    //                     to: {
    //                         $gte: textLength
    //                     }
    //                 }
    //             ]
    //         })
    //     } catch (error) {
    //         throw error
    //     }
    //     if (linkDomain != null) {
    //         linkNumbers = linkDomain.number
    //     }



    //     for (let i = 0; i < keyWords.length; i++) {

    //         data[keyWords[i].text] = this.getIndicesOf(texts, keyWords[i].text, wordsCount)
    //         totalNumbers += data[keyWords[i].text].count
    //         if (data[keyWords[i].text].count > 0 && linkNumbers > 0) {
    //             linkNumbers--
    //             content = this.makeLink(content, keyWords[i]);
    //             data[keyWords[i].text]["linked"] = true
    //         }
    //     }
    //     return {
    //         data: data,
    //         content: content
    //     }
    // }

    // private static getIndicesOf(searchStr: string[], str: string, wordsCount: number) {
    //     var indexes = [], i = -1, count = 0;
    //     while ((i = searchStr.indexOf(str, i + 1)) != -1) {
    //         indexes.push(i);
    //         count++;
    //     }
    //     return {
    //         indices: indexes,
    //         count: count,
    //         countPerTotalWord: count / wordsCount
    //     };
    // }


    // private static makeLink(content: string, keyWord: KeyWord): string {
    //     // return content
    //     return content.replace(keyWord.text, '<a href="' + keyWord.link + '"class= "aliki">' + keyWord.text + '</a>')
    // }



}