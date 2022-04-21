import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { check } from 'prettier';
import { map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateIndicadorDto } from './dto/create-indicador.dto';
import { UpdateIndicadorDto } from './dto/update-indicador.dto';
import { Indicador } from './entities/indicador.entity';

@Injectable()
export class IndicadorService {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  cmfApi = process.env.CMF_API;
  cmfApiKey = process.env.CMF_API_KEY;
  
  constructor(private httpService: HttpService,
    @InjectRepository(Indicador) private indicadorRepository: Repository<Indicador>
    ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createIndicadorDto: CreateIndicadorDto) {
    return 'This action adds a new indicador';
  }

  
  findAllUFs(): Promise<Indicador[]> {
    return this.indicadorRepository.find({where:{'Tipo':'UF'}});
  }
  findAllUTMs(): Promise<Indicador[]> {
    return this.indicadorRepository.find({where:{'Tipo':'UTM'}});
  }

  findAllUSDs(): Promise<Indicador[]> {
    return this.indicadorRepository.find({where:{'Tipo':'USD'}});
  }
  

  findAllUFForYear(year: number): Observable<AxiosResponse<Indicador[]>> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    return this.httpService
      .get(this.cmfApi +'uf/'+ year + '?apikey=' + this.cmfApiKey + '&formato=json')
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          //console.log(axiosResponse.data.UFs[0].Valor);
          if (axiosResponse.status === 200) {
            const data = axiosResponse.data;
            JSON.stringify(data);
            //console.log(data);
            return axiosResponse.data;
          } else {
            return new Observable<AxiosResponse<Indicador[]>>();
          }
        }),
      );
  }

  findAllUSDForYear(year: number): Observable<AxiosResponse<Indicador[]>> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    return this.httpService
      .get(this.cmfApi +'dolar/'+ year + '?apikey=' + this.cmfApiKey + '&formato=json')
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          //console.log(axiosResponse.data.UFs[0].Valor);
          if (axiosResponse.status === 200) {
            const data = axiosResponse.data;
            JSON.stringify(data);
            //console.log(data);
            return axiosResponse.data;
          } else {
            return new Observable<AxiosResponse<Indicador[]>>();
          }
        }),
      );
  }

  findAllUTMForYear(year: number): Observable<AxiosResponse<Indicador[]>> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    return this.httpService
      .get(this.cmfApi +'utm/'+ year + '?apikey=' + this.cmfApiKey + '&formato=json')
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          //console.log(axiosResponse.data.UFs[0].Valor);
          if (axiosResponse.status === 200) {
            const data = axiosResponse.data;
            JSON.stringify(data);
            //console.log(data);
            return axiosResponse.data;
          } else {
            return new Observable<AxiosResponse<Indicador[]>>();
          }
        }),
      );
  }

   padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
   formatDate(date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  async ufToday() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let resp : any ;
      
      let date = this.formatDate(new Date())
      console.log(date);
      let check= await this.indicadorRepository.findOne({ where: { 'Fecha': date, 'Tipo':'UF' } });
      console.log(check);
      if(check == undefined ){
        console.log('no existia');
        resp = await this.httpService
        .get(this.cmfApi + 'uf/?apikey=' + this.cmfApiKey + '&formato=json')
        .toPromise()
        .then((res) => res.data.UFs[0]);
        resp.Tipo='UF';
        this.indicadorRepository.save(resp);
        return resp;
      }else{
        return check;
      }
  }

  async usdToday() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let resp : any ;
      
      let date = this.formatDate(new Date())
      console.log(date);
      let check= await this.indicadorRepository.findOne({ where: { 'Fecha': date, 'Tipo':'USD' } });
      console.log(check);
      if(check == undefined ){
        console.log('no existia');
        resp = await this.httpService
        .get(this.cmfApi + 'dolar/?apikey=' + this.cmfApiKey + '&formato=json')
        .toPromise()
        .then((res) => res.data.Dolares[0]);
        resp.Tipo='USD';
        this.indicadorRepository.save(resp);
        return resp;
      }else{
        return check;
      }
  }

  async utmToday() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let resp : any ;
      
      let date = this.formatDate(new Date())
      console.log(date);
      let check= await this.indicadorRepository.findOne({ where: { 'Fecha': date.replace(/.{0,2}$/, '01'), 'Tipo':'UTM' } });
      console.log(check);
      if(check == undefined ){
        console.log('no existia');
        resp = await this.httpService
        .get(this.cmfApi + 'utm/?apikey=' + this.cmfApiKey + '&formato=json')
        .toPromise()
        .then((res) => res.data.UTMs[0]);
        resp.Tipo='UTM';
        this.indicadorRepository.save(resp);
        return resp;
      }else{
        return check;
      }
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
