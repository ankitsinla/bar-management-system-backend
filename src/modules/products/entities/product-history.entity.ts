import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'product_history' })
export class ProductHistory extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: Types.ObjectId;

  @Prop({ length: 20 })
  updateKey: string;

  @Prop({})
  previousValue: string;

  @Prop({})
  newValue: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  updatedBy: Types.ObjectId;
}

export const ProductHistorySchema = SchemaFactory.createForClass(ProductHistory);
