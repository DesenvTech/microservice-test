import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseEntity } from './entities/purchase.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly PurchaseRepository: Repository<PurchaseEntity>,
  ) {}
  abstract;
  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      const purchase = await this.PurchaseRepository.create({
        ...createPurchaseDto,
      });
      const response = await this.PurchaseRepository.save(purchase);

      return JSON.parse(JSON.stringify(response));
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<PurchaseDto[]> {
    try {
      return await this.PurchaseRepository.find();
    } catch (err) {
      return err;
    }
  }

  async findOne(id: string): Promise<PurchaseDto> {
    try {
      const response = await this.PurchaseRepository.findOne({
        where: {
          id,
        },
      });

      return JSON.parse(JSON.stringify(response));
    } catch (err) {
      return err;
    }
  }

  async update(id: string, updatePurchaseDto: Partial<UpdatePurchaseDto>) {
    try {
      return await this.PurchaseRepository.update(id, updatePurchaseDto);
    } catch (err) {
      return err;
    }
  }

  async remove(id: string) {
    try {
      return await this.PurchaseRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
