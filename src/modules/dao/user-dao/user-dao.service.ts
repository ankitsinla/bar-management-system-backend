import { User, UserRoleEnum, UserStatusEnum } from '@modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserDaoService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async getUserByUsername(username: string, status: UserStatusEnum) {
        return await this.userModel.findOne({
            username,
            status
        })
    }

    async createNewUser(name: string, username: string, hashedPassword: string, role: UserRoleEnum) {
        const newUser = new this.userModel({
            name,
            username,
            password: hashedPassword,
            status: UserStatusEnum.ACTIVE,
            role
        });

        return await newUser.save();
    }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async getUserById(id: string) {
        return await this.userModel.findById(id);
    }
}
