import { Controller, Get, Headers, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Cookies } from 'src/common/decorators/cookies.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get(':id')
  async sendMessage(
    @Param('id') id: number,
    @Headers() headers: { string: any }
  ) {
    return await this.appService.sendMessage({ id, headers });
  }
}
