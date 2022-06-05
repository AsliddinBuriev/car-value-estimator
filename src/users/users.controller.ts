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
import { CreateUserDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body.email, body.password);
  }

  @Post('signin')
  signIn(@Body() body: CreateUserDto) {
    return this.usersService.signIn(body.email, body.password);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
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
