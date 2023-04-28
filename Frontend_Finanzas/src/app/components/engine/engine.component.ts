import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ViewportScroller } from '@angular/common';
import { Run } from 'src/app/models/run';
import { RunService } from 'src/app/services/run.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css']
})
export class EngineComponent {
  val_ini:FormGroup;
  moneda!:string;
  valor_inmueble!:number;
  cuota_inicial!:number;
  monto_financiar!:number;
  tipo_tasa!:string;
  tiempo_tasa!:string;
  valor_tasa!:number;
  cantidad_anios!:number;
  num_periodos!:number;
  aparicion_tiempo_cap=false;
  aparcion_tiem_plazo=false;
  tiempo_cap!:string;
  frecuencia_pago!:string;
  realizar=true;
  anios_meses=0;
  frec_pago=0;
  dias_tasa=0;
  dias_conv=0;
  nueva_tasa=0;
  ape_tasa='-';
  saldo_iniciales:number[]=[];
  intereses:number[]=[];
  cuota=0;
  amortizaciones:number[]=[];
  plazo_gracia="";
  iniciarCorrida=false;
  aviso=false;
  simbolo="";
  ncap=0;
  mcap=0;
  constructor(private fb:FormBuilder,private viewPortScroller:ViewportScroller,private runService:RunService){
    this.moneda="-";
    this.valor_inmueble=0;
    this.cuota_inicial=0;
    this.monto_financiar=0;
    this.tipo_tasa="-";
    this.tiempo_tasa="-";
    this.valor_tasa=0;
    this.cantidad_anios=0;
    this.num_periodos=0;
    this.tiempo_cap="-";
    this.frecuencia_pago="-";
    this.val_ini=this.fb.group({
      mon:["",[Validators.required]],
      inm:["",[Validators.required]],
      cuo_i:["",[Validators.required]],
      tip_t:["",[Validators.required]],
      tie_t:["",[Validators.required]],
      tie_c:["Diaria"],
      frec_p:["",[Validators.required]],
      val_t:["",[Validators.required]],
      tie_p:["",[Validators.required]],
    }
    )
  }
  pasarDatos(){
    this.moneda=this.val_ini.get("mon")?.value;
    this.valor_inmueble=this.val_ini.get("inm")?.value;
    this.cuota_inicial=this.val_ini.get("cuo_i")?.value;
    this.monto_financiar=this.val_ini.get("inm")?.value-(this.val_ini.get("inm")?.value*(this.val_ini.get("cuo_i")?.value/100))
    this.tipo_tasa=this.val_ini.get("tip_t")?.value;
    this.tiempo_tasa=this.val_ini.get("tie_t")?.value;
    this.valor_tasa=this.val_ini.get("val_t")?.value;
    this.cantidad_anios=this.val_ini.get("tie_p")?.value;
    this.frecuencia_pago=this.val_ini.get("frec_p")?.value;
    if(this.aparicion_tiempo_cap){
      this.tiempo_cap=this.val_ini.get("tie_c")?.value;
    }
    this.anios_meses=this.cantidad_anios*12;
    this.hallarPeriodos();
    this.conversionTasa();
    
    this.realizar=false;
  }
  validarAparicion(e:any){
    if(e=="TN"){   
      this.aparicion_tiempo_cap=true
      this.val_ini.get("tie_c")?.addValidators([Validators.required]);
    }
    else{
      this.aparicion_tiempo_cap=false;
      this.val_ini.get("tie_c")?.removeValidators([Validators.required]);
    }
  }
  validarAparicionPlazo(e:any){
    if(e=="Parcial" || e=="Total"){   
      this.aparcion_tiem_plazo=true
     
    }
    else{
      this.aparcion_tiem_plazo=false
      
    }
  }
  hallarPeriodos(){
    if(this.frecuencia_pago=='Mensual'){
      this.frec_pago=1;
    }
    else if(this.frecuencia_pago=='Bimestral'){
      this.frec_pago=2;
    }
    else if(this.frecuencia_pago=='Trimestral'){
      this.frec_pago=3;
    }
    else if(this.frecuencia_pago=='Semestral'){
      this.frec_pago=6;
    }
    else if(this.frecuencia_pago=='Anual'){
      this.frec_pago=12;
    }

    this.num_periodos=this.anios_meses/this.frec_pago;
  }
  conversionTasa(){
    if(this.frecuencia_pago=='Mensual'){
      this.dias_conv=30;
      this.ape_tasa='TEM'
      this.plazo_gracia='M'
    }
    else if(this.frecuencia_pago=='Bimestral'){
      this.dias_conv=60;
      this.ape_tasa='TEB'
      this.plazo_gracia='B'
    }
    else if(this.frecuencia_pago=='Trimestral'){
      this.dias_conv=90;
      this.ape_tasa='TET'
      this.plazo_gracia='T'
    }
    else if(this.frecuencia_pago=='Semestral'){
      this.dias_conv=180;
      this.ape_tasa='TES'
      this.plazo_gracia='S'
    }
    else if(this.frecuencia_pago=='Anual'){
      this.dias_conv=360;
      this.ape_tasa='TEA'
      this.plazo_gracia='A'
    }

    if(this.tiempo_tasa=='M'){
      this.dias_tasa=30;
    }
    else if(this.tiempo_tasa=='B'){
      this.dias_tasa=60;
    }
    else if(this.tiempo_tasa=='T'){
      this.dias_tasa=90;
    }
    else if(this.tiempo_tasa=='S'){
      this.dias_tasa=180;
    }
    else if(this.tiempo_tasa=='A'){
      this.dias_tasa=360;
    }

    if(this.tiempo_cap=='Diaria'){
      this.mcap=this.dias_tasa*1;
      this.ncap=this.dias_conv*1;
    }
    else if(this.tiempo_cap=='Mensual'){
      this.mcap=this.dias_tasa/30;
      this.ncap=this.dias_conv/30;
    }
    else if(this.tiempo_cap=='Bimestral'){
      this.mcap=this.dias_tasa/60;
      this.ncap=this.dias_conv/60;
    }
    else if(this.tiempo_cap=='Trimestral'){
      this.mcap=this.dias_tasa/90;
      this.ncap=this.dias_conv/90;
    }
    else if(this.tiempo_cap=='Semestral'){
      this.mcap=this.dias_tasa/180;
      this.ncap=this.dias_conv/180;
    }
    else if(this.tiempo_cap=='Anual'){
      this.mcap=this.dias_tasa/360;
      this.ncap=this.dias_conv/360;
    }
    if(this.tipo_tasa=='TE'){
      this.nueva_tasa=Number((((Math.pow(1+(this.valor_tasa/100),this.dias_conv/this.dias_tasa))-1)*100));
    }
    else if(this.tipo_tasa=='TN'){
      this.nueva_tasa=Number(((Math.pow(1+((this.valor_tasa/100)/this.mcap),this.ncap))-1))*100
           
    }
    
  }
  corrida(){

    if(this.moneda=='Dólares'){
      this.simbolo='US$'
    }
    else if(this.moneda=='Soles'){
      this.simbolo='S/'
    }
    this.iniciarCorrida=true;
    let tasa=this.nueva_tasa/100;
    this.cuota=Number((this.monto_financiar*((tasa*(Math.pow(1+tasa,this.num_periodos)))/((Math.pow(1+tasa,this.num_periodos))-1))))
    this.saldo_iniciales.push(Number(this.monto_financiar));
    let i:number;
    
    for(i=0;i<this.num_periodos;i++){
     let interes=Number((this.saldo_iniciales[i]*tasa));
     let amortizaciones=Number((this.cuota-interes));
     this.intereses.push(interes);
     this.amortizaciones.push(amortizaciones);
     let saldo_final=Number((this.saldo_iniciales[i]-amortizaciones));
     this.saldo_iniciales.push(saldo_final);
      
    }
    
  }
  reiniciar(){
    window.location.reload();
  }
  guardarCorrida(){
    const run:Run={
      typeMoney:this.moneda,
      priceProperty:this.valor_inmueble,
      firstFee:this.valor_inmueble*this.cuota_inicial/100,
      amountFinance:this.monto_financiar,
      nameRate:this.tipo_tasa,
      timeRate:this.tiempo_tasa,
      rate:this.valor_tasa,
      frequencyPay:this.frecuencia_pago,
      convertRate:this.nueva_tasa,
      nameConvertRate:this.ape_tasa,
      numberYear:this.cantidad_anios,
      numberPeriods:this.num_periodos
    }
    this.runService.addRun(run,localStorage.getItem('idCustomer')!).subscribe(
      {
        next:(data)=>{
          console.log("Corrida Guardada")
        },
        error:(err)=>{
          console.log(err)
        } 
      }
    )
    this.aviso=true;
  } 
}
