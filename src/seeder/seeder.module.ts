import { User, UserSchema } from '@modules/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ])
    ],
    providers: [SeederService]

})
export class SeederModule { }
