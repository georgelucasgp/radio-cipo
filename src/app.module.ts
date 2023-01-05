import { Module } from '@nestjs/common';
import { RadioModule } from './modules/radio/radio.module';

@Module({
  imports: [RadioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
