import { ApiProperty } from '@nestjs/swagger';

export class GetIndicador {
  @ApiProperty()
  Valor: string;

  @ApiProperty()
  Fecha: string;
}
