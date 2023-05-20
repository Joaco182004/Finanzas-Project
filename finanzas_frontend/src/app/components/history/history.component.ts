import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Run } from 'src/app/models/run';
import { RunService } from 'src/app/services/run.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  displayedColumns: string[] = ['date', 'value', 'rate', 'frequency','rateConvert','time','view'];
  dataSource!: MatTableDataSource<Run>;
  show:boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private runService:RunService) {
    this.show=false;
    this.runService.getListRun(localStorage.getItem('idCustomer')!).subscribe(
      (data:Run[])=>{
        this.dataSource = new MatTableDataSource(data);
      }
    )
 
    // Assign the data to the data source for the table to render
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  seleccionarCorrida(id:string){
    localStorage.setItem("idRun",id);
  
  }
  regresarAtras(salida:number){
    this.show=false;
  }
}
