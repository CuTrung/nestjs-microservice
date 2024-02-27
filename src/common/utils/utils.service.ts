import { Injectable } from '@nestjs/common';
import { StringService } from './string/string.service';
import { DateService } from './date/date.service';

@Injectable()
export class UtilsService {
  constructor(
    private stringService: StringService,
    private dateService: DateService
  ) {}

  getStringService() {
    return this.stringService;
  }

  getDateService() {
    return this.dateService;
  }
}
