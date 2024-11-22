import { Exclude } from 'class-transformer';

export class ResUserDto {
  id: number;
  email: string;
  name: string;
  createdAt: Date;

  @Exclude()
  password: string;
}
