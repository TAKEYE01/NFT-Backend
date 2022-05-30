import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    public username: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;
}