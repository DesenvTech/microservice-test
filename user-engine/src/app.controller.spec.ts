import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';

const mock: UserDto = {
  id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
  name: 'Claudinei',
  document: '0132222334',
  email: 'email@email.com',
  phone: '5555555555',
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
    it('should return a App', async () => {
      const response = await controller.findOne('any');
      expect(appService.findOne).toBeCalledTimes(1);
      expect(appService.findOne).toBeCalledWith('any');
      expect(response).toBe(mock);
    });
  });
});
