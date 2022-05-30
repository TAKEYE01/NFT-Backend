import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt } from 'passport-jwt';
import { UserDto } from 'src/api/user/user.dto';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

export interface JwtPayload { username: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        const user = await this.authService.validateUser(payload);
        if(!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}