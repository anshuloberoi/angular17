import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviourService } from '../../Shared/behaviour.service';
import { AppService } from '../../Shared/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
  submitted:any=false
  forgot:FormGroup

  constructor(private fb:FormBuilder,private bs:BehaviourService ,private appservice:AppService){
this.forgot=fb.group({
  email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}.$")]],
})


  }

  get f(): { [key: string]: AbstractControl } {
    return this.forgot.controls;
  }

  onSubmit(){
    this.submitted=true

  }
}
