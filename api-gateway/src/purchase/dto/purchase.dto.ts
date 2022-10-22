import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreatePurchaseDto } from './create-purchase.dto';

export class PurchaseDto extends CreatePurchaseDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
