import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/typeorm/mapper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.createuserdto';
import { UserDto } from './user.dto';
import { nft_user } from './user.entity';
import { LoginUserDto } from './user.login';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(nft_user)
    private readonly repository: Repository<nft_user>, ) {}

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.repository.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.repository.findOne({ where: { username } });

        if(!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        //Compare passwords
        const areEqual = await (user.password === password);

        if(!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({
            where: { username }
        });
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = userDto;

        const userInDb = await this.repository.findOne({
            where: { username }
        });
        
        if(userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: nft_user = await this.repository.create({ username, password, email, });
        await this.repository.save(user);
        return toUserDto(user);
    }
}
