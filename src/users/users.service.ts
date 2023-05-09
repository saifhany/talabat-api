import * as bcrypt from 'bcryptjs'
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import { User} from ".././shared/types/user";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './dto/user.dto';
import {  TwilioService } from 'nestjs-twilio';

@Injectable()
export class UsersService {
    constructor( @InjectModel("User") private userModel: Model<User>,
    private readonly twilioService: TwilioService
                ) {
    }
    
    async createadmin(dto: CreateUserDto) : Promise<User> {
        try {
            const IsUserExist = await this.getUserByEmail(dto.email);
            if (IsUserExist) {
                throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST);
            } else {
              const hashPassword = await bcrypt.hash(dto.password, 5);       
              const user = await this.userModel.create({...dto, password: hashPassword});
              return user;
            }
          } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
          }
    }
    
    async forgetPassword ( phone:string , email:string){
        const user = await this.getUserByEmail(email);
        console.log(phone , 'user')
        if(user){
            const from = "+13194698785";
            const to = phone;
            const otp = this.generateOTP();
            const message = await this.sendSMS(from, to,otp);
            user.otp = otp
            await user.save();
            return message;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    }
          
   async resetPassword ( email:string, otp:Number , password:string){
        const user = await this.getUserByEmail(email);
        if(user){
            if(user.otp == otp){
                const hashPassword = await bcrypt.hash(password, 5);
                user.password = hashPassword
                await user.save();
                return user;
            }
            throw new HttpException('OTP not matched', HttpStatus.NOT_FOUND);
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    }

    async sendSMS(from :string, to:string,otp:Number) {
      return this.twilioService.client.messages.create({
        body: `Your OTP is ${otp}`,
        from,
        to,
      });
    }

    generateOTP() {
      let digits: Number = 1234567890
      let OTP : Number = 0
      for (let i = 0; i < 4; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
  }

    async getUserByEmail(email: string) : Promise<User> {
        const user = await this.userModel.findOne({email:email}).exec();
        return user
    }

 
    async updateRole(dto: AddRoleDto) : Promise<UserDTO> {
        const user = await this.userModel.findById(dto.userId).exec();
        if(user){
            user.role = dto.role;
            const updatedUser = await user.save();
            return { ...updatedUser.toJSON() };
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

  
}
