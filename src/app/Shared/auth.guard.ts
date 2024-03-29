import { CanActivateFn, Router } from '@angular/router';
import { BehaviourService } from './behaviour.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _bs: BehaviourService = inject(BehaviourService);
  let router=inject(Router)

    if ( _bs.getLocalUser()) {
      // console.log("token",token);   
      // authorised so return true
      return true;
    }
    // not logged in so redirect to landing page 
    router.navigate(['/auth']);
    return false;
};
