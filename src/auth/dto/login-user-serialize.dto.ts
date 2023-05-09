import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/shared/types/user';


export interface LoginSerializeDTO {
  id?: number;
  email?: string;
  phone?: string;
  role?: string;
  user: User;
  access_token: string;
}