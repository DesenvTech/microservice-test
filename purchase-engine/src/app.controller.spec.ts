import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
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

describe('AppController', () => {
  let controller: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            findOne: jest.fn(() => mock),
          },
        },
      ],
    }).compile();
    controller = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const response = await controller.findOne('any');
      expect(appService.findOne).toBeCalledTimes(1);
      expect(appService.findOne).toBeCalledWith('any');
      expect(response).toBe(mock);
    });
  });
});
