import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { RmqModule, RmqService } from '@nestjs-microservice/rmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

describe('AppService', () => {
  let service: AppService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        RmqService,
        {
          provide: AmqpConnection,
          useFactory: () => AmqpConnection,
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
