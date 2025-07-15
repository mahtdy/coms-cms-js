
import {
    google
} from "googleapis"

export class GoogleAPI {
    credential: any
    token: any
    constructor(
        credential: any,
        token: any
    ) {
        this.credential = credential
        this.token = token
    }


    async getIndexedPages(){
        let indexing = google.indexing("v3")
        
    }
}