import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum TableStatusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

@Schema({ timestamps: true, versionKey: false })
export class Table extends Document {
    @Prop({ required: true })
    tableName: string;

    @Prop({ required: true })
    status: TableStatusEnum;
}

export const TableSchema = SchemaFactory.createForClass(Table);
