import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  petForm!:FormGroup;



  constructor(private router:Router,private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.petForm=this.formBuilder.group({
    petName:['',Validators.required],
    status:['',Validators.required],
    category:[''],
    breed:[''],
    age:[''],
    image:['']
    });
    
  }

  addPet(){
    if(this.petForm.valid){
      this.api.postPet(this.petForm.value)
      .subscribe({
        next:(res)=>{
          alert("Pet added successfully!");
          this.petForm.reset();
          this.router.navigate(['/list']);
        },
        error:(err)=>{
          alert("Error while added the pet!"+err);
        }
      })
    }
  }

}
