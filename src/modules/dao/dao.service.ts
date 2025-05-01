/* eslint-disable prettier/prettier */
import { User } from "@modules/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from 'typeorm';

@Injectable()
export class DaoService {
    constructor(
        private dataSource: DataSource
    ){}

    // async getUserData(userId:number): Promise<User>{
    //     return this.dataSource.getRepository(User).findOne({
    //         where:[
    //             {id:userId},
    //         ],
    //         relations:{
    //             refdocs:true
    //         }
    //     })
    // }

    // async createRefdoc(refdoc:Refdoc): Promise<Refdoc>{
    //     return await this.dataSource.getRepository(Refdoc).save(refdoc);
    // }

    async checkById(userId:number){
        return await this.dataSource.getRepository(User).exists({
            where:{
                id:userId
            }
        })
    }
}
