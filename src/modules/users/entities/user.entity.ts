// /* eslint-disable prettier/prettier */
// import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Roles } from "./user-role.entity";

// export enum UserStatusEnum {
//     ACTIVE = "ACTIVE",
//     INACTIVE = "INACTIVE"
// }

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ length: 100 })
//     name: string;

//     @Column({ length: 100, unique:true })
//     username: string;

//     @Column({ length: 100 })
//     password: string;

//     @Column({ length: 100 , nullable:true})
//     email?: string;

//     @Column({ length: 12 , nullable:true})
//     mobile?: string;

//     @ManyToOne(() => Roles, (role) => role.users)
//     role: Roles

//     @Column({
//         type: "enum",
//         enum: UserStatusEnum,
//         default: UserStatusEnum.ACTIVE
//     })
//     status: UserStatusEnum;

//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;

//     constructor(name: string, username: string, password: string, status: UserStatusEnum, role: Roles) {
//         this.name = name;
//         this.username = username;
//         this.password = password;
//         this.createdAt = new Date();
//         this.updatedAt = new Date();
//         this.status = status;
//         this.role = role
//     }

// }


// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum UserStatusEnum {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE'
}

export enum UserRoleEnum {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	SALESMAN = 'SALESMAN'
}

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
	@Prop({ required: true, maxlength: 100 })
	name: string;

	@Prop({ required: true, maxlength: 100, unique: true })
	username: string;

	@Prop({ required: true, maxlength: 100 })
	password: string;

	@Prop({ maxlength: 100 })
	email?: string;

	@Prop({ maxlength: 12 })
	mobile?: string;

	@Prop({ enum: UserRoleEnum, required: true })
	role: UserRoleEnum;

	@Prop({ enum: UserStatusEnum, default: UserStatusEnum.ACTIVE })
	status: UserStatusEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
