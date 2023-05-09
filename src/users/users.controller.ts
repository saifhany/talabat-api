import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {Serialize} from "../shared/interceptor/serialize.interceptor";
import {UserDTO} from "./dto/user.dto";
import { forgetPasswordDto } from './dto/forget-password-dto';
import { resetPasswordDto } from './dto/reset-password-dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

   
    

    @Roles("admin")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Serialize(UserDTO)
    @Get(':email')
    getAll(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Roles("admin")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Put('/role')
    @Serialize(UserDTO)
    addRole(@Body() dto: AddRoleDto)  {
        return this.userService.updateRole(dto);
    }

    
    @Post('/forget-password')
    forgetPassword(@Body() dto: forgetPasswordDto)  {
        return this.userService.forgetPassword(dto.phone , dto.email);
    }   

    @Post('/reset-password')
    resetPassword(@Body() dto: resetPasswordDto)  {
        return this.userService.resetPassword(dto.email, dto.otp , dto.newPassword);
    }

}
