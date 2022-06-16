import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  petForm!:FormGroup;
  imgSrc!:string;
  constructor(private router:Router,private formBuilder:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public viewData:any,
    private dialogRef:MatDialogRef<ViewComponent>
   
    ) { }

  ngOnInit(): void {
    
    this.petForm=this.formBuilder.group({
      petName:[''],
      status:[''],
      category:[''],
      breed:[''],
      age:[''],
      image:['']
      });

  if(this.viewData){
    this.petForm.controls['petName'].setValue(this.viewData.petName);
    this.petForm.controls['age'].setValue(this.viewData.age);
    this.petForm.controls['breed'].setValue(this.viewData.breed);
    this.petForm.controls['status'].setValue(this.viewData.status);
    this.petForm.controls['category'].setValue(this.viewData.category);
    this.imgSrc=this.viewData.image; 
  }
  }

}

