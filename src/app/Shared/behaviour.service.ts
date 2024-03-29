import { Inject, Injectable ,PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourService {
  public userData = new BehaviorSubject<any>(null);

  
  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) { }

//main services 
signOut(): void {
  this.router.navigateByUrl('/');
  if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('credentials')
  }
  this.setUserData(null)
}


setUserData(data:any) {
    let value={
        ...this.getLocalUser(),
        ...data
    }
    if(data){
       let user = JSON.stringify(value)
       if (isPlatformBrowser(this.platformId)) {
       localStorage.setItem('credentials', user)
       }
       this.userData.next(value);
    }else{
      if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('credentials');
                  }
       
        this.userData.next('');
    }
}

getLocalUser() {
  let data: any;
  if (isPlatformBrowser(this.platformId)) {
      let user: any = localStorage.getItem('credentials')
      if (user) data = JSON.parse(user)
  }
  return data;
}

getLocalPage() {
  let data: any;
  if (isPlatformBrowser(this.platformId)) {
      let user: any = localStorage.getItem('page')
      if (user) data = JSON.parse(user)
  }
  return data;
}



getUserData() {
  return this.userData.asObservable();
}


//


//loader
  load(p: any) {
    if (p) {
        this.loadOn()
    } else {
        this.loadOff()
    }
               }

  loadOn() {
    if (isPlatformBrowser(this.platformId)) {
        document.getElementById('loaderDiv')?.classList.remove('d-none');
    }
           }

  loadOff() {
    if (isPlatformBrowser(this.platformId)) {
        document.getElementById('loaderDiv')?.classList.add('d-none');
    }
          }
//loader end

        }