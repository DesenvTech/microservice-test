import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

const mock: UserDto = {
  id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
  name: 'Claudinei',
  document: '0132222334',
  email: 'email@email.com',
  phone: '5555555555',
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(() => mock),
          },
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a User', async () => {
      const response = await controller.findOne('any');
      expect(userService.findOne).toBeCalledTimes(1);
      expect(userService.findOne).toBeCalledWith('any');
      expect(response).toBe(mock);
    });
  });
});
