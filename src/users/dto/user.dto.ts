import { Exclude, Expose, Transform } from "class-transformer";

export class UserDTO {
    @Expose()
    id: number;
  
    @Expose()
    email: string;
  
    @Expose()
    createdAt: Date;

    @Expose()
    phone: string;
    

    @Expose()
    updatedAt: Date;
  
    @Expose()
    role : string;

    @Exclude()
    password: string;

  }