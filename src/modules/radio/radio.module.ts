import { Module } from '@nestjs/common'
import { RadioController } from './radio.controller'
import { RadioGateway } from './radio.gateway'
import { RadioService } from './radio.service'

@Module({
  controllers: [RadioController],
  providers: [RadioService, RadioGateway],
})
export class RadioModule {}
