import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { env } from 'process';
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import { CategoryModule } from "./roles/category.module";
import { providerModule } from './invoice/provider.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
        }),
     
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UsersModule,
        CategoryModule,
        AuthModule,
        providerModule,
    ]
})

export class AppModule{}