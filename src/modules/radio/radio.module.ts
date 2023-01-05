import { Module } from '@nestjs/common';
import { RadioService } from './radio.service';
import { RadioController } from './radio.controller';

@Module({
  controllers: [RadioController],
  providers: [RadioService],
})
export class RadioModule {}
