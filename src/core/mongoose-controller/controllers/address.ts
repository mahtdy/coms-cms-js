import { Types, UpdateQuery } from "mongoose";
import BaseController, { ControllerOptions } from "../controller";
import Address, { addressSchema } from "../repositories/address/model";
import AddressRepository from "../repositories/address/repository";
import { Response } from "../../controller";
import { Put } from "../../decorators/method";
import { Body, Query } from "../../decorators/parameters";
// import { RepositoryConfigOptions } from "../repository";

export class AddressController extends BaseController<Address>{

   @Put("")
   editAddress(
      @Query({
         destination : "id",
         schema : BaseController.id
      }) id : string,
      @Body({
         schema : addressSchema
      }) data: any
   ): Promise<Response> {
        return this.editById(id, {
            $set : data
        } , {
            ok: true
        })
   }
    constructor(options? : ControllerOptions){
        super("/address" , new AddressRepository() ,options)
    }
}


const address = new AddressController({
    insertSchema : addressSchema
})

export default address