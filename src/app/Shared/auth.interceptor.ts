import { HttpInterceptorFn } from '@angular/common/http';
import { BehaviourService } from './behaviour.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _bs: BehaviourService = inject(BehaviourService);
  let currentUserData = _bs.getLocalUser()
  let headers = {};
  if (currentUserData) {
    
    const token = currentUserData.access_token ? currentUserData.access_token : '';
    if (token) {
      headers = {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
      };
  
     
    }
   
  }
  const authReq =  req.clone({
    setHeaders: headers
  });
  return next(authReq);

};
