import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PurchaseDto } from './dto/purchase.dto';

const mock: PurchaseDto = {
  id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
  userId: 'caaf24b1-1a6c-4720-a38f-14d88577df78',
  amount: 1,
  description: 'Desc',
  price: 10,
  value: 20,
};

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppService,
          useValue: {
            findOne: jest.fn(() => mock),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const response = await service.findOne('any');
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith('any');
      expect(response).toBe(mock);
    });
  });
});
