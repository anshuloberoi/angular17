
import { Routes } from '@angular/router';

import { LayoutComponent } from './Theam/layout/layout.component';

import { authGuard } from './Shared/auth.guard';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './Pages/home/home.component';


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
  {path:'home',component:HomeComponent },
 
                                     ]
},

{path:'auth',component:LoginComponent},



];
