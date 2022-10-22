import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
