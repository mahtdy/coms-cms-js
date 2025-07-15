
interface ChangeData{
    [x : string] : {
        from : "session" | "req",
        source: string
    }
}
export function changeBody(data : ChangeData){
    for (const key in data) {
        
    }
    
}