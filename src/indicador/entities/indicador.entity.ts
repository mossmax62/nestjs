import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Indicador {

  @PrimaryGeneratedColumn() 
   id: number; 
  
  @Column({default:null})
  Tipo: string;

  @Column({default:null})
  Fecha: string;

  @Column({default:null})
  Valor: string;


}
