import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {AuthModule} from "../auth/auth.module";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { TwilioModule } from 'nestjs-twilio';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      TwilioModule.forRoot({
        accountSid: process.env.TWILIO_ACCOUNT_SID ,
        authToken: process.env.TWILIO_AUTH_TOKEN, 
      }),
      forwardRef(() => AuthModule)
  ],
  exports: [
      UsersService
  ]
})
export class UsersModule {}
