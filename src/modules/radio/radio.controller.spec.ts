import { Test, TestingModule } from '@nestjs/testing';
import { RadioController } from './radio.controller';
import { RadioService } from './radio.service';

describe('RadioController', () => {
  let controller: RadioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadioController],
      providers: [RadioService],
    }).compile();

    controller = module.get<RadioController>(RadioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
