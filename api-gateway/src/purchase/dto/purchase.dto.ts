import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreatePurchaseDto } from './create-purchase.dto';

export class PurchaseDto extends CreatePurchaseDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
