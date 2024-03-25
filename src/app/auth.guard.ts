import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const localStor=localStorage.getItem('loginId')
  let tocken:any=localStor



if(tocken){
return true;
}else{
return false
}


};
