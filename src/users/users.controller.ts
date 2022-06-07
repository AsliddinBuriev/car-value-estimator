import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/user-update.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @Serialize(UserDto)
  getAll() {
    return this.usersService.find({});
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(parseInt(id));
  }
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
