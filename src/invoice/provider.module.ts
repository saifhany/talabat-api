import {forwardRef, Module} from '@nestjs/common';
import { providerService  } from './provider.service';
import { ProviderController } from './provider.controller';
import {AuthModule} from "../auth/auth.module";
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderSchema } from './provider.schema';

@Module({
  providers: [providerService],
  controllers: [ProviderController],
  imports: [
    MongooseModule.forFeature([{ name: 'Provider', schema: ProviderSchema }]),
      forwardRef(()=> AuthModule)
  ],
  exports: [
    providerService
  ]
})
export class providerModule {}
