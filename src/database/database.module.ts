/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import mongoose from 'mongoose';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

mongoose.set('debug', true);
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'sql',
        type: 'mysql',
        host: configService.get('DB_HOST').toString(),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME').toString(),
        password: configService.get('DB_PASSWORD').toString(),
        database: configService.get('DB_DATABASE').toString(),
        // entities: [__dirname + "/../**/*.entity.{ts,js}"],
        synchronize: false,
        logging: true,
      }),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'nest_learning', // optional, if not in URI
      // useNewUrlParser and useUnifiedTopology are default true in Mongoose 6+
    }),
  ],
  providers: [],
  controllers: [],
})
export class DatabaseModule {
  constructor() {}
}
