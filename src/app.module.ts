import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndicadorModule } from './indicador/indicador.module';
import { DealsModule } from './deals/deals.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [IndicadorModule, DealsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
