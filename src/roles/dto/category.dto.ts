import { Exclude, Expose } from "class-transformer";

export class CategoryDto {
    @Expose()
     id: number;
     @Expose()
     name: string;
     @Expose()
     description: string;
        @Expose()
        created: Date;
        @Expose()
        updated: Date;

}