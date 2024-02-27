import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { StringModule } from './string/string.module';
import { StringService } from './string/string.service';
import { DateModule } from './date/date.module';
import { DateService } from './date/date.service';

@Module({
  imports: [StringModule, DateModule],
  providers: [UtilsService, StringService, DateService],
  exports: [UtilsService, StringService, DateService],
})
export class UtilsModule {}
