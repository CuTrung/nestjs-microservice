import { RmqParams } from '@nestjs-microservice/rmq';
import { IsString } from 'class-validator';

export class CreateUserDto extends RmqParams {
  @IsString()
  age: string;
}
