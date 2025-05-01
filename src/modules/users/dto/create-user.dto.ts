import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRoleEnum } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: UserRoleEnum, description: 'User Role', example: UserRoleEnum })
    @IsEnum(UserRoleEnum)
    @IsNotEmpty()
    role: UserRoleEnum;
}
