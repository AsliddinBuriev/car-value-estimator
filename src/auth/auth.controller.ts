import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/user-create.dto';
import { AuthService } from './auth.service';
import { JwtAtGuard, JwtRtGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(JwtAtGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signOut(@Req() req: Request) {
    console.log(req.user);
    // return this.authService.signOut(body.id);
  }

  @UseGuards(JwtRtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh() {
    // return this.authService.refresh(body.id);
  }
}
