import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  petForm!:FormGroup;
  constructor(private router:Router,private api:ApiService,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<EditComponent>) { }

  ngOnInit(): void {
    this.petForm=this.formBuilder.group({
      petName:['',Validators.required],
      status:['',Validators.required],
      category:[''],
      breed:[''],
      age:[''],
      image:['']
      });

    if(this.editData){
      this.petForm.controls['petName'].setValue(this.editData.petName);
      this.petForm.controls['age'].setValue(this.editData.age);
      this.petForm.controls['breed'].setValue(this.editData.breed);
      this.petForm.controls['status'].setValue(this.editData.status);
      this.petForm.controls['category'].setValue(this.editData.category);
      this.petForm.controls['image'].setValue(this.editData.image);
    }
  }

  updatePet(){
    this.api.putPet(this.petForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Pet updated successfully!");
        this.petForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error while updating pet... "+err);
      }
    });
  }
}

