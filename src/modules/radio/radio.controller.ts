import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RadioService } from './radio.service';
import { CreateRadioDto } from './dto/create-radio.dto';
import { UpdateRadioDto } from './dto/update-radio.dto';

@Controller('radio')
export class RadioController {
  constructor(private readonly radioService: RadioService) {}

  @Post()
  create(@Body() createRadioDto: CreateRadioDto) {
    return this.radioService.create(createRadioDto);
  }

  @Get()
  findAll() {
    return this.radioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.radioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRadioDto: UpdateRadioDto) {
    return this.radioService.update(+id, updateRadioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.radioService.remove(+id);
  }
}
