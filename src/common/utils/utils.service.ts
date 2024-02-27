import { Injectable } from '@nestjs/common';
import { StringService } from './string/string.service';

@Injectable()
export class UtilsService {
  constructor(private stringService: StringService) {}

  getStringService() {
    return this.stringService;
  }
}
