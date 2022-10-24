import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
