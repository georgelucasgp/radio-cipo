import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Store from 'cache-manager-redis-store';
import { RadioModule } from './modules/radio/radio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      store: Store,
      host: 'redis-16568.c98.us-east-1-4.ec2.cloud.redislabs.com',
      port: 16568,
      password: 'jmW0I9uWDxH24FBPyYvrfOCbwDGPQfMN',
    }),
    RadioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
