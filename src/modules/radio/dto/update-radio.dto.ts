import { PartialType } from '@nestjs/mapped-types';
import { CreateRadioDto } from './create-radio.dto';

export class UpdateRadioDto extends PartialType(CreateRadioDto) {}
