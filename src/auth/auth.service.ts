import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const hashedPassword = this.hashData(password);
    const user = await this.usersService.createUser(email, hashedPassword);
    const { at, rt } = await this.genToken(user);
    await this.updateRt(user.id, rt);
    user.password = undefined;
    user.hashedRt = undefined;
    return { at, rt, user };
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user || !this.compareHash(password, user.password))
      throw new BadRequestException('Incorrect email or password!');
    const { at, rt } = await this.genToken(user);
    await this.updateRt(user.id, rt);
    user.password = undefined;
    user.hashedRt = undefined;
    return { at, rt, user };
  }

  async signOut(id: number) {
    return await this.usersService.update(id, { hashedRt: null });
  }

  async updateRt(id: number, rt: string) {
    const hashedRt = this.hashData(rt);
    await this.usersService.update(id, { hashedRt });
  }

  hashData(raw: string) {
    return createHash('sha256').update(raw).digest('hex');
  }
  compareHash(raw: string, hash: string): boolean {
    if (createHash('sha256').update(raw).digest('hex') === hash) return true;
    return false;
  }
  async genToken(user: any) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { id: user.id },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        { id: user.id },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return { at, rt };
  }
}
