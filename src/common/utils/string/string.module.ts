import { Module } from '@nestjs/common';
import { StringService } from './string.service';

@Module({
  imports: [],
  exports: [StringService],
  providers: [StringService],
})
export class StringModule {}
