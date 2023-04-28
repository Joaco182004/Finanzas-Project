import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent {
  register:FormGroup;
  login:FormGroup;
  msgError=false;
  loginError=false;
  msg_error!:string;
  constructor(private router:Router, private customerService:CustomerService,private fb:FormBuilder){
    this.register=this.fb.group({
      name:["",[Validators.required]],
      email:["",[Validators.required,Validators.email]],
      psw:["",[Validators.required]],
      date:["",[Validators.required]]
    }
    )
    this.login=this.fb.group(
      {
        email:["",[Validators.required]],
        psw:["",[Validators.required]]
      }
    )
  }
  cambiarSlide(){
    const container = document.getElementById('container');
    container?.classList.add("right-panel-active")
  }
  invertirSlide(){
    const container = document.getElementById('container');
    container?.classList.remove("right-panel-active")
  }
  enviarCorreo(){
    
  }
  inicioSesion(){ 
    this.customerService.validateCustomer(this.login.get('email')!.value,this.login.get('psw')!.value).subscribe(
      {
        next:(data)=>{
          localStorage.setItem("idCustomer",data.id?.toString()!);
          this.router.navigate(["/dashboard/home"])
        },
        error:(err)=>{
          this.loginError=true;
        } 
      }
    )
   
  }
  imprimirFecha(){
    var hoy = new Date();
    var cumpleanos = new Date(this.register.get('date')!.value);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad>=18
  }
  registro(){
    const customer:Customer={
      name:this.register.get('name')!.value,
      email:this.register.get('email')!.value,
      password:this.register.get('psw')!.value,
      birthday:this.register.get('date')!.value
    }
    if(this.imprimirFecha()){
    this.customerService.addCustomer(customer).subscribe(
      {
        next:(data)=>{
          this.register.reset();
          const container = document.getElementById('container');
          container?.classList.remove("right-panel-active")
        },
        error:(err)=>{
          this.msgError=true;
          this.msg_error="Ha ingresado un correo que ya estan en el sistema."
          this.register.reset();
        } 
      }
    )
    }
    else{
      this.msgError=true;
          this.msg_error="Usted aún es menor de edad, no puede registrarse."
          this.register.reset();
    }
  }
  

}
