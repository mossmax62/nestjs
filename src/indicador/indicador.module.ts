import { Module } from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { IndicadorController } from './indicador.controller';
import { HttpModule } from '@nestjs/axios';
import { Indicador } from './entities/indicador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IndicadorController],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Indicador])
  ],
  providers: [IndicadorService],
})
export class IndicadorModule {}
