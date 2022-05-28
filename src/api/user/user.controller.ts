import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { nft_user } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Get(':id')
    public getUser(@Param('id', ParseIntPipe) id: number): Promise<nft_user> {
        return this.service.getUser(id);
    }

    @Post()
    public createUser(@Body() body: CreateUserDto): Promise<nft_user> {
        return this.service.createUser(body);
    }
}
