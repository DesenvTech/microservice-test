import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { CreatePurchaseDto } from './create-purchase.dto';

export class PurchaseDto extends CreatePurchaseDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  user: UserDto;
}
