import { Component, inject } from '@angular/core';
import { AppService } from '../../Shared/app.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
  constructor(private appservice:AppService){
this.http.get('https://gorest.co.in/public/v2/posts').subscribe((res:any)=>{
console.log(res);
this.data=res


  })}
}
