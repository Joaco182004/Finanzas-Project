import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Customer } from '../models/customer';
import { Run } from '../models/run';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  resourcePath:string = environment.serverJSON+environment.resourceRun;
  constructor(private http:HttpClient) { }
  addRun(run:Run,id:string){
    return this.http.post<Run>(this.resourcePath+"/customer/"+id,run)
  }
  getListRun(id:string){
    return this.http.get<Run[]>(this.resourcePath+"/customer/"+id)
  }
  getRun(id:string){
    return this.http.get<Run>(this.resourcePath+"/"+id)
  }
}
