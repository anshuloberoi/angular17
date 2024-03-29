
import { Routes } from '@angular/router';

import { LayoutComponent } from './Theam/layout/layout.component';

import { authGuard } from './Shared/auth.guard';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { ForgotComponent } from './Auth/forgot/forgot.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';


export const routes: Routes = [
  {
    path:'',
    redirectTo: "auth",
    pathMatch:"full"
  },
{
path:'',
component:LayoutComponent,
canActivate:[authGuard],
children:[


  // pages
  {path:'home',component:HomeComponent },
  {path:'about',component:AboutComponent },
  {path:'contact',component:ContactComponent },

  //next 



  //next
    ]
},


  // auth
  {path:'auth',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot',component:ForgotComponent},




];
