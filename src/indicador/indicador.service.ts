import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { CreateIndicadorDto } from './dto/create-indicador.dto';
import { UpdateIndicadorDto } from './dto/update-indicador.dto';
import { Indicador } from './entities/indicador.entity';

@Injectable()
export class IndicadorService {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  constructor(private httpService: HttpService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createIndicadorDto: CreateIndicadorDto) {
    return 'This action adds a new indicador';
  }

  findAll() {
    return `This action returns all indicador`;
  }

  findAllForYear(year: number): Observable<AxiosResponse<Indicador[]>> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const apiCmf = process.env.API_CMF;
    return this.httpService
      .get(
        'https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/' +
          year +
          '?apikey='+apiCmf+'&formato=json',
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          //console.log(axiosResponse.data.UFs[0].Valor);
          if (axiosResponse.status === 200) {
            const data = axiosResponse.data;
            JSON.stringify(data);
            console.log(data);
            return axiosResponse.data;
          } else {
            return new Observable<AxiosResponse<Indicador[]>>();
          }
        }),
      );
  }

  today() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    return this.httpService
      .get(
        'https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/?apikey='+process.env.API_CMF+'&formato=json',
      )
      .toPromise()
      .then((res) => res.data.UFs[0]);
  }

  findOne(id: number) {
    return `This action returns a #${id} indicador`;
  }

  update(id: number, updateIndicadorDto: UpdateIndicadorDto) {
    return `This action updates a #${id} indicador`;
  }

  remove(id: number) {
    return `This action removes a #${id} indicador`;
  }
}
