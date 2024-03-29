import { CanActivateFn, Router } from '@angular/router';
import { BehaviourService } from './behaviour.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _bs: BehaviourService = inject(BehaviourService);
  let router=inject(Router)
    if ( _bs.getLocalUser()) {
      return true;
    }
    router.navigate(['/auth']);
    return false;
};
