
import axios from "axios";

export default async function translator(text: string,source: string = "fa",destination : string ="en"){
    try {
        // console.log(`https://translate.google.com/translate_a/t?client=dict-chrome-ex&sl=${source}&tl=${destination}&q=${text}`)
        let response =await axios.get(encodeURI(`https://translate.google.com/translate_a/t?client=dict-chrome-ex&sl=${source}&tl=${destination}&q=${text}`),{
           
        })
        return response.data[0]
    } catch (error) {
        throw error
    }

}