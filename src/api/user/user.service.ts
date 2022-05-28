import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { nft_user } from './user.entity';

@Injectable()
export class UserService {
    @InjectRepository(nft_user)
    private readonly repository: Repository<nft_user>;
    
    public getUser(id: number): Promise<nft_user> {
        return this.repository.findOne(id);
    }

    public createUser(body: CreateUserDto): Promise<nft_user> {
        const user: nft_user = new nft_user();

        user.username = body.username;
        user.email = body.email;
        user.password = body.password;

        return this.repository.save(user);
    }
}
