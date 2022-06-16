import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PetStore';

  constructor(private router:Router){}

  ngOnInit():void{}

  listClick(){
    this.router.navigate(['/list']);
   
  }

  addClick(){
    this.router.navigate(['/add']);
   
  }

  homeClick(){
    this.router.navigate(['']);
  }
}
