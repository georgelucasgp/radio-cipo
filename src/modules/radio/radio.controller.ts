import { Controller, Post, Body } from '@nestjs/common'
import { RadioService } from './radio.service'
import { CreateRadioDto } from './dto/create-radio.dto'

@Controller('radio')
export class RadioController {
  constructor(
    private readonly radioService: RadioService
  ) { }

  @Post()
  create(@Body() createRadioDto: CreateRadioDto) {
    return this.radioService.create(createRadioDto)
  }
}
