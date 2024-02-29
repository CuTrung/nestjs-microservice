import { Test, TestingModule } from '@nestjs/testing';
import { RmqController } from './rmq.controller';

describe('RmqController', () => {
  let controller: RmqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RmqController],
    }).compile();

    controller = module.get<RmqController>(RmqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
