import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTableDto {
    @ApiProperty({ description: 'Table name', example: "Table-1" })
    @IsString()
    @IsNotEmpty()
    tableName: string
}
