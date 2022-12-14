import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseDto } from './dto/purchase.dto';
import { PurchaseService } from './purchase.service';

const mock: PurchaseDto = {
  id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
  userId: 'caaf24b1-1a6c-4720-a38f-14d88577df78',
  amount: 1,
  description: 'Desc',
  price: 10,
  value: 20,
};

describe('PurchaseService', () => {
  let service: PurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PurchaseService,
          useValue: {
            findOne: jest.fn(() => mock),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a purchase', async () => {
      const response = await service.findOne('any');
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith('any');
      expect(response).toBe(mock);
    });
  });
});
