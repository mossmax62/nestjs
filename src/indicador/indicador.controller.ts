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
  uf: AxiosResponse<Indicador[]>;
  @Post()
  create(@Body() createIndicadorDto: CreateIndicadorDto) {
    return this.indicadorService.create(createIndicadorDto);
  }

  @Get()
  findAll() {
    return 'Hola Max';
    //return this.indicadorService.findAll();
  }

  @Get('uf/today')
  async today() {
    const ufs = await this.indicadorService.today();
    return ufs;
  }

  @Get('uf/:year')
  findAllForYear(@Param('year') year: string) {
    return this.indicadorService.findAllForYear(+year);
    //return 'findAllForYear';
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
