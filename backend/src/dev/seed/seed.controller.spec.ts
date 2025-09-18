import { Test, TestingModule } from '@nestjs/testing';
import { DevSeedController } from './seed.controller';

describe('DevSeedController', () => {
  let controller: DevSeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevSeedController],
    }).compile();

    controller = module.get<DevSeedController>(DevSeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
