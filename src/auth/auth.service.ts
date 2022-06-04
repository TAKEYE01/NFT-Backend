import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/api/user/user.createuserdto';
import { LoginUserDto } from 'src/api/user/user.login';
import { JwtPayload } from './jwt.strategy';
import { UserDto } from 'src/api/user/user.dto';

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface LoginStatus {
    success: boolean;
    message: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, ) {}

    async register(userDto: CreateUserDto):
    Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'User registered.',
        };
        try {
            await this.userService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: 'User already exists.',
            };
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {

        let status: LoginStatus = {
            success: true,
            message: 'User Logged in.',
        };
        
        //Find user in database
        const user = await this.userService.findByLogin(loginUserDto);

        //Generate and sign token
        const token = this._createToken(user);

        return{status, username: user.username, ...token};
    }

    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);
        if(!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
