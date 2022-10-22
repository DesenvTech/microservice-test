import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
