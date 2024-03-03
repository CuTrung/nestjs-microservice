import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { RmqModule, RmqService } from '@nestjs-microservice/rmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqQueue } from '@src/consts';

describe('AppService', () => {
  let service: AppService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        AppModule,
        RmqModule.register({ queue: RmqQueue.NESTJS_MICROSERVICE_SEND }),
      ],
      providers: [AppService, RmqService, ConfigService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
