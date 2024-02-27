import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { AppModule } from './app.module';
import { UtilsService } from 'src/common/utils/utils.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppService, UtilsService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
