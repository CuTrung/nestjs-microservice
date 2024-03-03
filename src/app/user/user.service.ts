import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RmqService } from '@nestjs-microservice/rmq';

@Injectable()
export class UserService {
  constructor(private rmqService: RmqService) {}
  create({ context, headers, ...createUserDto }: CreateUserDto) {
    this.rmqService.logging({
      headers: { ...headers, pattern: context.getPattern() },
      ...createUserDto,
    });
    this.rmqService.delAck(context);
    return { hello: 'trung' };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
