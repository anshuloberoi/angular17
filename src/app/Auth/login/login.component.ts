import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviourService } from '../../Shared/behaviour.service';
import { AppService } from '../../Shared/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  login:FormGroup 
  submitted:any=false

  constructor(private bs:BehaviourService,private appserice:AppService,private fb:FormBuilder,private route:Router){
  this.login = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}.$")]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    acceptTerms: ['']
  });


}
get f(): { [key: string]: AbstractControl } {
  return this.login.controls;
}
onSubmit(): void {
  this.submitted = true;

  if (this.login.invalid) {
    return;
  }
this.route.navigate(['/home'])
  console.log(JSON.stringify(this.login.value, null, 2));
}


 
}
