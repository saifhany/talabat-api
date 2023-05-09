import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {RegistrationDto} from "./dto/registration.dto";
import { User } from 'src/shared/types/user';
import { loginUserDto } from 'src/users/dto/login-user.dto';
import { LoginSerializeDTO } from './dto/login-user-serialize.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService,
                ) {
                }

    async login(userDto: loginUserDto):Promise<LoginSerializeDTO>{
        const user = await this.validateUser(userDto);
        user.user.password = undefined; 
        return user;
    }

    async registration(dto: RegistrationDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createadmin({...dto, password: hashPassword});
        
       const access_token = await this.generateToken(user);
        return {user , access_token} ;
    }

    
    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id,role: user.role}
           const token = this.jwtService.sign(payload);
        return  token
    }

    private async validateUser(userDto: loginUserDto)  :Promise<{user: User;access_token: string}> {
        const user = await this.userService.getUserByEmail(userDto.email);
        console.log(user , 'user')
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            const access_token =  await  this.generateToken(user);

            return { user , access_token}
            
        }
        throw new UnauthorizedException({message: 'Incorrect Email or Password'})
    }
}
