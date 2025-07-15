import { Get, Post, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import People from "../repositories/people/model";
import PeopleRespository from "../repositories/people/repository";
import AddressRepository from "../repositories/address/repository";
import { z } from "zod"
import { Body, Query } from "../../decorators/parameters";
import { addressSchema } from "../repositories/address/model";
import { Response } from "../../controller";


export class PeopleController extends BaseController<People>{
    addressRepo: AddressRepository;
    constructor(path: string, repository: PeopleRespository, options?: ControllerOptions) {
        super(path, repository, options)
        this.addressRepo = new AddressRepository()
    }

    @Post("")
    async insertNewPeople(
        @Body({
            schema: z.object({
                nameAndFamily: z.string(),
                email: BaseController.email.optional(),
                phone: BaseController.phone,
                address: addressSchema.optional(),
                isReal: z.boolean().default(true),
                info: z.any()
            }),
        }) data: People
    ): Promise<Response> {
        try {
            if (data.address != undefined) {
                Object.assign(data.address, {
                    type: "people"
                })
                let address = await this.addressRepo.insert(data.address as any)
                // console.log(address ,data.address)
                data.address = address._id
            }
            return await this.create(data)
        } catch (error) {
            throw error
        }
    }

    @Put("")
    async updatePeople(
        @Query({
            schema: BaseController.id,
            destination: "id"
        }) id: string,
        @Body({
            schema: z.object({
                nameAndFamily: z.string().optional(),
                email: BaseController.email.optional(),
                phone: BaseController.phone.optional(),
                address: addressSchema.optional(),
                isReal: z.boolean().optional(),
                info: z.any().optional()
            }),
        }) data: any
    ): Promise<Response> {
        try {
            
            let people = await this.repository.findById(id)
            if(people == null) {
                return {
                    status: 404
                }
            }
            if (people.address != undefined) {
                
                await this.addressRepo.findByIdAndUpdate(data.address , {
                    $set : data.address
                })

                delete data.address
            }
            else if(data.address!= undefined) {
                let address = await this.addressRepo.insert(data.address)
                data.address = address._id
            }
            return this.editById(id , {
                $set : data
            })

        } catch (error) {
            throw error
        }
    }



    initApis() {
        this.addRouteWithMeta("/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("/search/list", "get", this.getSearchList.bind(this))
    }
}

const people = new PeopleController(
    "/people",
    new PeopleRespository({
        population : [{
            path : "address"
        }]
    }),
    {
        searchFilters: {
            nameAndFamily: ["reg", "eq"],
            email: ["reg", "eq"],
            phone: ["reg", "eq"],
            address: ["list", "eq"]
        },
        population : [{
            path : "address"
        }]
    },
    
);

export default people