import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {RegistrationDto} from "./dto/registration.dto";
import { LoginSerializeDTO } from './dto/login-user-serialize.dto';
import { loginDto } from './dto/login.dto';
import { Serialize } from 'src/shared/interceptor/serialize.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

 
    @Post('/login')
    login(@Body() userDto: loginDto) :  Promise<LoginSerializeDTO>{
        return this.authService.login(userDto);
    }

    @Post('/register')
    registrationadmin(@Body() dto: RegistrationDto) {
        return this.authService.registration(dto);
    }



}
