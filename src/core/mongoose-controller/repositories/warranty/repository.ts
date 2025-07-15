import { Types } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import AddressRepository from "../address/repository";
import Warranty, { Warrantor, WarrantyModel } from "./model";
import Address from "../address/model";


export default class WarrantyRepository extends BaseRepositoryService<Warranty> {
    addressRepo: AddressRepository
    constructor(options?: RepositoryConfigOptions) {
        super(WarrantyModel, options)
        this.addressRepo = new AddressRepository()
    }


    async addWarrantor(warrantor: Warrantor, paymentId: string | Types.ObjectId) {
        try {
            let address = await this.addressRepo.insert(warrantor.address as Address)
            warrantor.address = address._id

            let workAddrress = await this.addressRepo.insert(warrantor.workAddrress as Address)
            warrantor.workAddrress = workAddrress._id
            return this.insert({
                warrantor,
                paymentConfig: paymentId
            } as any)
        } catch (error) {
            throw error
        }
    }

    async editWarrantor(id: string, warrantor: any) {
        try {
            let currentwarrantor = await this.findById(id)
            if (currentwarrantor == null) {
                return
            }

            if (currentwarrantor.warrantor.workAddrress == undefined) {
                let workAddrress = await this.addressRepo.insert(warrantor.workAddrress as Address)
                warrantor.workAddrress = workAddrress._id
            }

            else {
                await this.addressRepo.updateOne({
                    _id: currentwarrantor.warrantor.workAddrress
                }, {
                    $set: warrantor.workAddrress
                })

                warrantor.workAddrress = currentwarrantor.warrantor.workAddrress

            }



            await this.addressRepo.updateOne({
                _id: currentwarrantor.warrantor.address
            }, {
                $set: warrantor.address
            })
            warrantor.address = currentwarrantor.warrantor.address


            return this.updateOne({
                _id: id
            }, {
                $set: {
                    warrantor
                }
            })

        } catch (error) {
            throw error
        }
    }


    async addWarranty(id: string, data: any) {
        if (data.deedAddress != undefined) {
            if (data.deedAddress._id) {
                 await this.addressRepo.updateOne( {
                    _id : data.deedAddress._id
                }, {
                    $set : data.deedAddress
                })
                data.deedAddress = data.deedAddress._id
            }
            else {
                let address = await this.addressRepo.insert(data.deedAddress as Address)
                data.deedAddress = address._id
            }
        }

        data.confirmed = false
        return this.updateOne({
            _id : id
        } , {
            $set : data
        })
    }

 
    
    async rejectWarranty(
        id : string,
        rejectMessage : string
    ){
        try {
            await this.updateOne({
                _id : id
            } , {
                $set :{
                    isReject : true,
                    rejectMessage ,
                    confirmed : false
                }
            })
        } catch (error) {
            throw error
        }
    }

}