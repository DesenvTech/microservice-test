import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseEntity } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      const purchase = await this.purchaseRepository.create(createPurchaseDto);
      const response = await this.purchaseRepository.save(purchase);

      return response;
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    try {
      const response = await this.purchaseRepository.find({
        relations: ['user'],
      });

      const purchase = response as PurchaseDto[];

      return purchase;
    } catch (err) {
      return err;
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.purchaseRepository.findOne({
        relations: ['user'],
        where: {
          id,
        },
      });

      const purchase = response as PurchaseDto;

      return JSON.stringify(purchase);
    } catch (err) {
      return err;
    }
  }

  async update(id: string, updatePurchaseDto: Partial<UpdatePurchaseDto>) {
    try {
      return await this.purchaseRepository.update(id, updatePurchaseDto);
    } catch (err) {
      return err;
    }
  }

  async remove(id: string) {
    try {
      return await this.purchaseRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
