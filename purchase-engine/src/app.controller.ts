import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('create-purchase')
  create(
    @Payload() createPurchaseDto: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    return this.appService.create(createPurchaseDto['payload']);
  }

  @MessagePattern('find-all-purchase')
  index(): Promise<PurchaseDto[]> {
    return this.appService.findAll();
  }

  @MessagePattern('find-purchase')
  findOne(@Payload() id: string): Promise<PurchaseDto> {
    return this.appService.findOne(id);
  }

  @MessagePattern('update-purchase')
  update(@Payload() { id, updatePurchaseDto }: any): Promise<void> {
    return this.appService.update(id, updatePurchaseDto);
  }

  @MessagePattern('delete-purchase')
  remove(@Payload() id: string): Promise<void> {
    return this.appService.remove(id);
  }
}
