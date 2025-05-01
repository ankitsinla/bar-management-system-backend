// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types, Schema as MongooseSchema } from 'mongoose';

export enum PaymentModeEnum {
    CASH = "CASH",
    UPI = "UPI",
    CARD = "CARD"
}

const ProductItemSchema = new MongooseSchema(
    {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true }
    },
    { _id: false }
);

@Schema({ timestamps: true, versionKey: false })
export class Transaction extends Document {
    @Prop({ required: true, type: [ProductItemSchema] })
    products: Types.DocumentArray<any>;

    @Prop({ required: false })
    discount: number;

    @Prop({ required: false })
    discountRemarks: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    transactionDate: string;

    @Prop({ required: true })
    paymentMode: PaymentModeEnum;

    @Prop({ required: false })
    paymentRemarks: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    billerId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Table' })
    tableId: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);