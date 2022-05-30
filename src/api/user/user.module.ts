import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { nft_user } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([nft_user])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
