import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  private readonly logger = new Logger(PurchaseController.name);

  @MessagePattern('create-purchase')
  create(@Payload() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto['payload']);
  }

  @MessagePattern('find-all-purchase')
  findAll() {
    return this.purchaseService.findAll();
  }

  @MessagePattern('find-purchase')
  findOne(@Payload() { id }: any) {
    return this.purchaseService.findOne(id);
  }

  @MessagePattern('update-purchase')
  update(@Payload() { id, updatePurchaseDto }: any) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @MessagePattern('delete-purchase')
  remove(@Payload() { id }: any) {
    return this.purchaseService.remove(id);
  }
}
