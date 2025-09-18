import { Test, TestingModule } from '@nestjs/testing';
import { DevSeedService } from './seed.service';

describe('DevSeedService', () => {
  let service: DevSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevSeedService],
    }).compile();

    service = module.get<DevSeedService>(DevSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
