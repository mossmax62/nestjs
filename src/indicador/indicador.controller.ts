import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { CreateIndicadorDto } from './dto/create-indicador.dto';
import { UpdateIndicadorDto } from './dto/update-indicador.dto';
import { Indicador } from './entities/indicador.entity';
import { response } from 'express';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';

@Controller('indicador')
export class IndicadorController {
  constructor(private readonly indicadorService: IndicadorService) {}

  @Post()
  create(@Body() createIndicadorDto: CreateIndicadorDto) {
    return this.indicadorService.create(createIndicadorDto);
  }

  @Get('uf')
  findAllUFs() {
    //return 'Hola Max';
    return this.indicadorService.findAllUFs();
  }

  @Get('usd')
  findAllUSDs() {
    //return 'Hola Max';
    return this.indicadorService.findAllUSDs();
  }

  @Get('utm')
  findAllUTMs() {
    //return 'Hola Max';
    return this.indicadorService.findAllUTMs();
  }

  @Get('uf/today')
  async ufToday() {
    return await this.indicadorService.ufToday();
  }

  @Get('usd/today')
  async usdToday() {
    return await this.indicadorService.usdToday();
  }

  @Get('utm/today')
  async utmToday() {
    return await this.indicadorService.utmToday();
  }

  @Get('uf/:year')
  findAllUFForYear(@Param('year') year: string) {
    return this.indicadorService.findAllUFForYear(+year);
  }

  @Get('usd/:year')
  findAllUSDForYear(@Param('year') year: string) {
    return this.indicadorService.findAllUSDForYear(+year);
  }

  @Get('utm/:year')
  findAllUTMForYear(@Param('year') year: string) {
    return this.indicadorService.findAllUTMForYear(+year);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indicadorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndicadorDto: UpdateIndicadorDto,
  ) {
    return this.indicadorService.update(+id, updateIndicadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indicadorService.remove(+id);
  }
}
