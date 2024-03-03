import { Controller, Get, Headers, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    console.log('>>> go');
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
