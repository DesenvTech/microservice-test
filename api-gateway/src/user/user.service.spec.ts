import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

const mock: UserDto = {
  id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
  name: 'Claudinei',
  document: '0132222334',
  email: 'email@email.com',
  phone: '5555555555',
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(() => mock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
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
