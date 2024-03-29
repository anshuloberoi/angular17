import { HttpInterceptorFn } from '@angular/common/http';
import { BehaviourService } from './behaviour.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);
  const  _bs: BehaviourService = inject(BehaviourService);
  // spinner:NgxSpinner=inject(NgxSpinner)
  const toastr:ToastrService=inject(ToastrService)
    return next(req).pipe(catchError((err:any) => {
  console.log(err,'adsfasdfasdfasdfas');
  
      _bs.load(false)
        let message = "Server Error";
        if(err.error){
          if(err.error.message) message = err.error.message;
          if(err.error.error) message = err.error.error.message;
        }
  
        toastr.error(message,'Error');
       
        if (err.status === 401) {
          _bs.signOut()
        }
        return throwError(() => message); 
    }))
};
