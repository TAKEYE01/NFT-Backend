import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/api/user/user.createUserDto';
import { LoginUserDto } from 'src/api/user/user.login';
import { AuthService, LoginStatus, RegistrationStatus } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto, ): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(createUserDto,);

        if(!result.success) {
            throw new HttpException(result, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }
}
