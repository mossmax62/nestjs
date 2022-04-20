import { Module } from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { IndicadorController } from './indicador.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [IndicadorController],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [IndicadorService],
})
export class IndicadorModule {}
