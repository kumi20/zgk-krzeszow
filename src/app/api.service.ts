import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  domanie = 'http://'; 
  uri =  this.domanie + '/cms/';
    
  uriGallery = this.domanie + '/cms/assets/gallery';

  sourceImageNews = this.domanie + '/source/';
 
  headers:Headers = new Headers;    

  constructor(private _http:Http) { 
      this.headers.append('AuthorizationToken',localStorage.getItem('userQumiToken'));
  }

  get(uri){
    return this._http.get(this.uri+uri).map(
        response => response.json()
    )
  }
    
  post(uri, json){
      return this._http.post(this.uri+uri,json).map(
          response => response.json()
      )
  }    


}


