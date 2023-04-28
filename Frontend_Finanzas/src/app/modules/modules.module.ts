import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    
  ],
  exports:[
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule
  ]
})
export class ModulesModule { }
