
import Ticket, { TicketModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import { FilterQuery } from "mongoose"


export default class TicketRepository extends BaseRepositoryService<Ticket> {
    constructor(options?: RepositoryConfigOptions) {
        super(TicketModel, options)
    }

    async getCountByState(
        query: FilterQuery<Ticket> = {}
    ) {
        try {
            return await this.collection.aggregate([{
                $match: query
            },
            {
                $group: {
                    _id: "$state",
                    count: {
                        $sum: 1
                    }
                }
            }
            ])
        } catch (error) {
            throw error
        }
    }
}
