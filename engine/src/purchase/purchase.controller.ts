import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  private readonly logger = new Logger(PurchaseController.name);

  @MessagePattern('create-purchase')
  create(
    @Payload() createPurchaseDto: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    return this.purchaseService.create(createPurchaseDto['payload']);
  }

  @MessagePattern('find-all-purchase')
  index(): Promise<PurchaseDto[]> {
    return this.purchaseService.findAll();
  }

  @MessagePattern('find-purchase')
  findOne(@Payload() id: string): Promise<PurchaseDto> {
    return this.purchaseService.findOne(id);
  }

  @MessagePattern('update-purchase')
  update(@Payload() { id, updatePurchaseDto }: any): Promise<void> {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @MessagePattern('delete-purchase')
  remove(@Payload() id: string): Promise<void> {
    return this.purchaseService.remove(id);
  }
}
