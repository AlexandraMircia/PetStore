import { ListComponent } from './../list/list.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor( private http:HttpClient) { }

  postPet(data:any){
    return this.http.post<any>("http://localhost:3000/petList/",data);
  }

  getPet(){
    return this.http.get<any>("http://localhost:3000/petList/");
  }

  putPet(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/petList/"+id,data);
  }

  deletePet(id:number){
    return this.http.delete<any>("http://localhost:3000/petList/"+id);
  }

  
    
  }
