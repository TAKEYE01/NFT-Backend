import { UserDto } from "src/api/user/user.dto";
import { nft_user } from "src/api/user/user.entity";

export const toUserDto = (data: nft_user): UserDto => {
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email, };
    return userDto;
};