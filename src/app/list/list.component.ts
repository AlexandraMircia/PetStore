import { DeleteComponent } from './../delete/delete.component';
import { EditComponent } from './../edit/edit.component';
import { ViewComponent } from './../view/view.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns:string[]=['index', 'petName','status','action'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  statusList=["Available","Pending","Sold"];
 
  constructor(private router:Router, private api:ApiService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllPets();
  }


  getAllPets(){
    this.api.getPet()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>
      alert("Error while uploading data... " + err)
    })
  }

  viewClick(row:any){
    
    
    this.dialog.open(ViewComponent,{width:'50%',data:row});
    
  }

  editClick(row:any){
   this.dialog.open(EditComponent,{
    width:'50%',
    data:row
   }).afterClosed().subscribe(val=>{
    if(val==='update'){
       this.getAllPets();
    }
   }
   
   )
  }

  deleteClick(row:any){
    this.dialog.open(DeleteComponent,{
      width:'20%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='delete'){
        this.getAllPets();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
