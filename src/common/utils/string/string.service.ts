import { Injectable } from '@nestjs/common';

@Injectable()
export class StringService {
  toArray(str: string, split_with: string | RegExp = ',') {
    return str.split(split_with);
  }
}
