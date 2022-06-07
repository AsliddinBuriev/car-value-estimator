import { Exclude, Expose } from 'class-transformer';
interface User {
  id: number;
  email: string;
}
export class UserDto {
  @Expose()
  at: string;

  @Expose()
  rt: string;

  @Expose()
  id: number;

  @Expose()
  email: string;
}
