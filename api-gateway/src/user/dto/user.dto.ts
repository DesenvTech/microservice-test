import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
