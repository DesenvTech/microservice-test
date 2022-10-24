import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

const mock: UserDto[] = [
  {
    id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
    name: 'Claudinei',
    document: '0132222334',
    email: 'email@email.com',
    phone: '5555555555',
  },
];

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
            findOne: jest.fn(() => mock[0]),
            findAll: jest.fn(() => mock),
            update: jest.fn(() => mock),
            remove: jest.fn(() => mock),
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
    it('should return a user', async () => {
      const response = await controller.findOne(
        '79ef5f2a-5785-414b-8401-0a751985c3fe',
      );
      expect(userService.findOne).toBeCalledTimes(1);
      expect(response).toBe(mock[0]);
    });
  });

  describe('findAll', () => {
    it('should return a user list', async () => {
      const response = await controller.findAll();
      expect(userService.findAll).toBeCalledTimes(1);
      expect(response).toBe(mock);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const response = await controller.update(mock[0].id, {
        phone: '555551',
      });
      expect(response).toBe(mock);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const response = await controller.remove(mock[0].id);
      expect(userService.remove).toBeCalledTimes(1);
      expect(response).toBe(mock);
    });
  });
});
