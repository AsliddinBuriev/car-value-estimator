import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  find(query: object) {
    return this.repo.find(query);
  }

  createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findById(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.repo.find({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateObj: Partial<User>) {
    const user = await this.findById(id);
    Object.assign(user, updateObj);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    return this.repo.remove(user);
  }
}
