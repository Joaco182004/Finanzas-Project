import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Customer } from '../models/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  resourcePath:string = environment.serverJSON+environment.resourceCustomer;
  constructor(private http:HttpClient) { }
  addCustomer(customer:Customer){
    return this.http.post<Customer>(this.resourcePath,customer)
  }
  validateCustomer(email:string,psw:string){
    return this.http.get<Customer>(this.resourcePath+"/email/"+email+"/password/"+psw);
   }
  getCustomer(id:string){
    return this.http.get<Customer>(this.resourcePath+"/"+id);
  }
}
