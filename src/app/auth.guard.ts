import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const localStor=localStorage.getItem('loginId')
  let tocken:any=localStor



if(tocken){
console.log('hello');
return true;
}else{
console.log('nohello');
return false
}


};
