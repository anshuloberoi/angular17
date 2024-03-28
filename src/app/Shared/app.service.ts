import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _baseUrl = environment.apiUrl;
  rootUrl: any;
  http: any;

  constructor(
    private httpClient: HttpClient) {
  }

// main api 
allApi(url:any = '',context:any = {}, method:any = 'get'){
  if(method == 'post'){
   return this.add(context, url)
  }else if(method == 'put'){
    return this.update(context, url)
  }else if(method == 'delete'){
    return this.deleteRecord(context, url)
  }
  return this.getAll(url, context);
}

add(context:any, url:any) {
  return this.httpClient.post(this._baseUrl + url, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}

update(context:any, url:any) {
  return this.httpClient.put(this._baseUrl + url, context).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  );
}

getAll(url:any, param?:any, baseUrl:any = '') {
  let params = new HttpParams();
  let _baseUrl = baseUrl?baseUrl:this._baseUrl;
  if (param) {
    for (let key of Object.keys(param)) {
      params = params.set(key, param[key])
    }
  }
  return this.httpClient.get(_baseUrl + url, { params: params }).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

deleteRecord(param?:any, url:any = 'delete') {
  let params = new HttpParams();
  if (param) {
    for (let key of Object.keys(param)) {
      params = params.set(key, param[key])
    }
  }
  return this.httpClient.delete(this._baseUrl + url, { params: params }).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
}

//


// imag upload 

  uploadImage(url:any,fdata:any) {
    const formData: FormData = new FormData();
    // formData.append('data', fileToUpload, fileToUpload.name);
    let oarr=Object.keys(fdata)
    oarr.map(itm=>{
      formData.append(itm,fdata[itm])
    })
    return this.httpClient.post(this._baseUrl + url,formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  //

 // status change common
 
 status(id:any, model:any, status:any) {
  let url = this._baseUrl + 'changeStatus?id=' + id + '&model=' + model + '&status=' + status;

  return this.httpClient.put(url, {}).pipe(
    map((response: any) => {
      return response;
    }),
    catchError(this.handleError)
  )
} 
 //



 //service for number enter only

 numberOnly(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;


}

 //

  getAuthorizationHeader() {
    throw new Error("Method not implemented.");
  }

  getParams(parameters:any) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    })
    return params;
  }


  handleError(error: HttpErrorResponse) {
    console.log(error);
    console.log(error.status);

    let iserror = false;
    let message = '';
    if (error.status == 401) {
      iserror = true;
      message = error.message=='authorization'?"Your session has been expired":error.error.message
      // message = error.error.message;
    } else if (error.status == 404) {
      iserror = true;
      message = error.message;
    } else if (error.status == 400) {
      iserror = true;
      message = error.message;
    }else if (error.status == 500) {
      iserror = true;
      message = error.message;
    }
    else if (error.message == "E_INVALID_NEW_RECORD") {
      iserror = true;
      message = 'You entered invalid Email';
    }

    console.log(message);
    // this.toster.error(message,'',{timeOut:400})
    return throwError(()=>message?message:'Something bad happened; please try again later.')

  }
}
