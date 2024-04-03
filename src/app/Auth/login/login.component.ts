import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviourService } from '../../Shared/behaviour.service';
import { AppService } from '../../Shared/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgxGpAutocompleteModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  options:any
  login:FormGroup
  submitted:any=false
   toastr:ToastrService=inject(ToastrService)
  constructor(private bs:BehaviourService,private appserice:AppService,private fb:FormBuilder,private route:Router ){
  this.login = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,4}.$")]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    // address:['']
    // acceptTerms: ['']
  });


}
get f(): { [key: string]: AbstractControl } {
  return this.login.controls;
}
onSubmit(): void {
  this.submitted = true;

  if (this.login.invalid) {
    return;
  }
  this.appserice.allApi('login/admin  ',this.login.value,'post')
  .subscribe({
    next: (res) => {
      if(res.success){
        // if(this.adminLoginForm.value.acceptTerms){
        //   //here it is set the value of adminLoginForm in localstorage
        //   localStorage.setItem('remember',JSON.stringify(this.acceptTerms.value))
        // }else{
        
        //   localStorage.removeItem('remember')
        // }

        const result = res.data;

        this.bs.load(false);

        this.bs.setUserData(result)

      

        this.route.navigate(['/home']);
      }else{
        this.bs.load(false)
      }
    },
    // error: (e) =>  this.toastr.error(e,'Error')
  });

this.route.navigate(['/home'])
  console.log(JSON.stringify(this.login.value, null, 2));
}

address:any
handleAddressChange(address: any) {
  console.log("hello");
  
  let lat = address.geometry.location.lat();
  let lng = address.geometry.location.lng();


  let aArray: any = address.address_components;
  console.log(address, "address");
  const getCountry = () => {
    let value = "";

    aArray.map((item: any) => {
      if (item.types[0] == "country") {
        value = item.long_name;

      }
    });
 
    return value;
  };

  const getCity = () => {
    let value = "";
    aArray.map((item: any) => {
      if (item.types[0] == "locality") {
        value = item.long_name;
      }
    });
    return value;
  };

  const getLocality = () => {
    let value = "";
    aArray.map((item: any) => {
      if (item.types[0] == "locality") {
        value = item.long_name;
      }
    });
    return value;
  };

  const getState = () => {
    let value = "";
    aArray.map((item: any) => {
      if (item.types[0] == "administrative_area_level_1") {
        value = item.long_name;
      }
    });
    return value;
  };

  // const getPostalCode = () => {
  //   let value = '';
  //   aArray.map((item: any) => {
  //     if (item.types[0] == "postal_code") {
  //       value = item.long_name
  //     }
  //   })
  //   return value;
  // }

  const getPostalCode = () => {
    let value = "";
    aArray.map((item: any) => {
      if (item.types[0] == "postal_code") {
        value = item.long_name;
      }
    });
    return value;

  };

  this.address = {
    lat,
    lng,
    address: address.formatted_address,
    country: getCountry(),
    state: getState(),
    city: getCity(),
    pincode: getPostalCode(),
    locality: getLocality(),
  };
  // if (this.address.pincode) {
    let local = this.address.address.split(',')
    local = local[0]

  // }
}
}
