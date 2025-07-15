import { FilterQuery, Types } from "mongoose";
import { Response } from "../../controller";
import BaseController, { ControllerOptions } from "../controller";
import BankAccount from "../repositories/bankAccount/model";
import BankAccountRepository from "../repositories/bankAccount/repository";
import { z } from "zod";
import { QueryInfo } from "../repository";
import { Get, Put } from "../../decorators/method";
import { Body, Query } from "../../decorators/parameters";
import AddressRepository from "../repositories/address/repository";



export class BankAccountController extends BaseController<BankAccount> {
    addressRepo: AddressRepository
    constructor(path: string, repository: BankAccountRepository, options?: ControllerOptions) {
        super(path, repository, options)
        this.addressRepo = new AddressRepository()
    }


    async create(data: BankAccount, ...params: any[]): Promise<Response> {
        try {
            let address :any  = data.address
            address.type = "bank"
            const newAddress = await this.addressRepo.insert(address as any)
            data.address = newAddress._id
            return await super.create(data)
        } catch (error) {
            throw error
        }
        return {
            status: 200,

        }
    }


    @Get("")
    findById(
        @Query({ destination: "id", schema: BaseController.id })
        id: string | Types.ObjectId, queryInfo?: QueryInfo): Promise<Response> {
        if(queryInfo == undefined){
            queryInfo = {}
        }
        if(queryInfo.population == undefined){
            queryInfo.population = []
        }
        queryInfo.population.push({
            path : 'address'
        })
        return super.findOne({
            _id : id,
        }, queryInfo)
    }


    @Put("")
    async edit(
        @Query({ destination: "id", schema: BaseController.id })
        id: string,
        @Body({
            schema: z.object({
                title: z.string().optional(),
                isReal: z.boolean().optional(),
                isOfficial: z.boolean().optional(),
                enabled: z.boolean().optional(),
                shaba: BaseController.shaba.optional(),
                card: BaseController.card.optional(),
                number: z.string().optional(),

                address: BaseController.address,
                deinPossible: z.boolean().default(false),
                maxDein: z.coerce.number().int().positive().optional(),
                deinDrodown: z.coerce.number().positive().optional(),
                deinExprie: z.coerce.date().optional()

            })
        }) bankAccountData: BankAccount
    ) {
        try {
            let addressId = (bankAccountData.address as any)._id

            console.log(addressId)
            
            if(addressId == undefined){
                let address :any  = bankAccountData.address
                address.type = "bank"
                const newAddress = await this.addressRepo.insert(bankAccountData.address as any)
                
         
                bankAccountData.address = newAddress._id

                console.log(newAddress , bankAccountData )
            }
            else {
                let address :any  = bankAccountData.address
                address.type = "bank"

                await this.addressRepo.updateOne({
                    _id : addressId
                } , 
                {
                    $set : address
                })

                bankAccountData.address = addressId
            }
            return await this.editById(id, {
                $set: bankAccountData
            }, {
                ok: true
            })
        } catch (error) {
            throw error
        }
    }
    



    async delete(id: Types.ObjectId | string, ...params: [...any]): Promise<Response> {
        try {
            let account = await this.repository.findById(id)
            if (account?.canDelete == false) {
                return {
                    status: 400,
                    message: "حذف امکان پذیر نمی باشد"
                }
            }
        } catch (error) {
            throw error
        }
        return super.delete(id)
    }

    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("es/search/list", "get", this.getSearchList.bind(this))
    }



}

const bankAccount = new BankAccountController("/bank-account", new BankAccountRepository({
    population : [
        {
            path: 'address'
        }
    ]
}), {
    insertSchema: z.object({
        title: z.string(),
        isReal: z.boolean().default(true),
        isOfficial: z.boolean().default(true),
        shaba: BaseController.shaba,
        card: BaseController.card,
        number: z.string(),
        type: z.enum(["sell", "buy", "wallet"]).default("sell"),
        // createdAt : BaseController.date,
        bank: z.string(),
        enabled: z.boolean().default(true),
        owner: z.string(),
        isTankhah: z.boolean().default(false),


        address: BaseController.address,
        deinPossible: z.boolean().default(false),
        maxDein: z.number().optional(),
        deinDrodown: z.number().optional(),
        deinExprie: z.coerce.date()

    }),
    searchFilters: {
        title: ["reg", "eq"],
        enabled: ["eq"],
        isReal: ["eq"],
        isOfficial: ["eq"],
        isTankhah: ["eq"],
        _id: ["eq", "list"]
    }

})

export default bankAccount

