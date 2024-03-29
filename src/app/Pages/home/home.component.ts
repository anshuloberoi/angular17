import { Component, inject } from '@angular/core';
import { AppService } from '../../Shared/app.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviourService } from '../../Shared/behaviour.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 baseurl=environment.apiUrl
data:any
http=inject(HttpClient)
  constructor(private appservice:AppService,private bs:BehaviourService){
  this.getEvent()
  }
  getEvent(){
    this.bs.load(true)

    this.appservice.allApi('events?').subscribe({next:(res)=>{

      console.log(res);
      this.data=res.data.data

    }})
  }

}
