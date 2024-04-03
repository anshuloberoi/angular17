import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './Shared/error.interceptor';
import { authInterceptor } from './Shared/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Loader } from '@googlemaps/js-api-loader';

export const appConfig: ApplicationConfig = {
  providers: [

   provideRouter(routes),
 
   provideClientHydration(),
 
   provideAnimations(),
{
  provide: Loader,
  useValue: new Loader({
    apiKey: 'AIzaSyCKNlYJxb2T3c8a1rvP5r4FTopvfWWCwHI',
    libraries: ['places']
  })

},
   
   provideHttpClient(withInterceptors([ authInterceptor,errorInterceptor])),
  
   provideToastr({
    timeOut: 4000,
   
    preventDuplicates: true,
  }),
 
  ]
};
