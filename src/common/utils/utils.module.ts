import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { StringModule } from './string/string.module';
import { StringService } from './string/string.service';

@Module({
  imports: [StringModule],
  providers: [UtilsService, StringService],
  exports: [UtilsService, StringService],
})
export class UtilsModule {}
