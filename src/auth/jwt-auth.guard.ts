import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAtGuard extends AuthGuard('jwt-at') {}

@Injectable()
export class JwtRtGuard extends AuthGuard('jwt-rt') {}
