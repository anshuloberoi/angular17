import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LayoutComponent } from './Theam/layout/layout.component';
import { authGuard } from './auth.guard';
import { HeaderComponent } from './Theam/header/header.component';
import { PageModule } from './page/page.module';

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
  {
    path:'home',
    loadChildren:()=>PageModule
  }]
},

  {
  path:'auth',
  loadChildren:()=>AuthModule
},



];
