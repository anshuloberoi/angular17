import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [{
  path:'',
 component:LoginComponent
},
{
  path:'changepassword',
  component:ChangepasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
