import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fecha!:any
  name!:string;
  constructor(private router:Router,private customerService:CustomerService){
    this.fecha=Date()
   
    this.customerService.getCustomer(localStorage.getItem("idCustomer")?.toString()!).subscribe(
      (data:Customer)=>{
        this.name=data.name;
      }
    )
  }
}
