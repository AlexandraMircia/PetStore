import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
 petForm!:FormGroup;
 idPet!:number;
  constructor(private api:ApiService,private dialogRef:MatDialogRef<DeleteComponent>,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public delPet:any ) { }

  ngOnInit(): void {
    this.petForm=this.formBuilder.group({
      petName:[''],
      status:[''],
      category:[''],
      breed:[''],
      age:[''],
      image:['']
      });

      if(this.delPet){
        this.idPet=this.delPet.id; 
      }
      
  }

  deletePet(id:number){
    this.api.deletePet(id)
   .subscribe({
    next:(res)=>{
      alert("Pet was deleted successfully!");
      this.petForm.reset();
      this.dialogRef.close('delete');
    },
    error:(err)=>{
      alert("Error while deleting the pet... "+err);
    }
   })
  }

}


