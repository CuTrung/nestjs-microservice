import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RmqService } from '@nestjs-microservice/rmq';

@Module({
  controllers: [UserController],
  providers: [UserService, RmqService],
})
export class UserModule {}
