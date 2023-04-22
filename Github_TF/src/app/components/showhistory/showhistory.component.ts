import { Component,EventEmitter,Input, Output} from '@angular/core';
import { Run } from 'src/app/models/run';
import { RunService } from 'src/app/services/run.service';

@Component({
  selector: 'app-showhistory',
  templateUrl: './showhistory.component.html',
  styleUrls: ['./showhistory.component.css']
})
export class ShowhistoryComponent {
  @Input() show!:boolean;
  @Output() cambio=new EventEmitter<number>()
  typeMoney!:string;
  priceProperty!:number;
  firstFee!:number;
  amountFinance!:number;
  nameRate!:string;
  rate!:number;
  nameConvertRate!:string;
  newRate!:number;
  frecuencyPay!:string;
  numberPeriods!:number;
  numberYear!:number;
  //corrida
  saldos_iniciales:number[]=[];
  tasa:number=0;
  cuota:number=0;
  intereses:number[]=[];
  amortizaciones:number[]=[];
  plazo_gracia=""
  simbolo=""
  constructor(private runService:RunService){
    this.runService.getRun(localStorage.getItem("idRun")!).subscribe(
      (data:Run)=>{
        this.typeMoney=data.typeMoney;
        this.priceProperty=data.priceProperty;
        this.firstFee=data.firstFee;
        this.amountFinance=data.amountFinance;
        this.rate=data.rate;
        this.nameRate=data.nameRate+data.timeRate;
        this.newRate=data.convertRate;
        this.nameConvertRate=data.nameConvertRate;
        this.frecuencyPay=data.frequencyPay;
        this.numberPeriods=data.numberPeriods;
        this.numberYear=data.numberYear;
        this.corrida()
      }
    )
    
  }
  regresarAtras(){
    this.cambio.emit(1)
  }
  faltantes(){
    if(this.frecuencyPay=="Mensual"){
      this.plazo_gracia='M'
    }
    else if(this.frecuencyPay=="Bimestral"){
      this.plazo_gracia='B'
    }
    else if(this.frecuencyPay=="Trimestral"){
      this.plazo_gracia='T'
    }
    else if(this.frecuencyPay=="Semestral"){
      this.plazo_gracia='S'
    }
    else if(this.frecuencyPay=="Anual"){
      this.plazo_gracia='A'
    }
    if(this.typeMoney=="Dólares"){
      this.simbolo="US$"
    }
    else if(this.typeMoney=="Soles"){
      this.simbolo="S/"
    }
  }
  corrida(){
    console.log(this.numberPeriods)
    this.faltantes()
    this.saldos_iniciales.push(this.amountFinance);
    this.tasa=Number(this.newRate)/100;
    this.cuota=Number((this.amountFinance*((this.tasa*(Math.pow(1+this.tasa,this.numberPeriods)))/((Math.pow(1+this.tasa,this.numberPeriods))-1))).toFixed(2));
    let i:number;
    for(i=0;i<this.numberPeriods;i++){
      let interes=Number((this.saldos_iniciales[i]*this.tasa).toFixed(2));
      let amortizaciones=Number((this.cuota-interes).toFixed(2));
      this.intereses.push(interes);
      this.amortizaciones.push(amortizaciones);
      let saldo_final=Number((this.saldos_iniciales[i]-amortizaciones).toFixed(2));
      this.saldos_iniciales.push(saldo_final);
    }
  }
}
