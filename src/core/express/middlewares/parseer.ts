import { NextFunction, Request, Response } from "express";



export default  function  parser(name : string){
    return (req: Request, res : Response, next : NextFunction) => {
        try {
            req.body[name] = JSON.parse(req.body[name])
        } catch (error) {
            
        }
        next()
    }
}