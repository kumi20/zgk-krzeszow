import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable()
export class ApiService {

  domaine = 'http://kumi20.webd.pl/zgk/';    
  //uri = this.domaine + 'apitest/cms/'; //api testowe
  uri = this.domaine + 'api/cms/'; //api produkcyjne      
    
  uriGallery = this.domaine + '/cms/assets/gallery';

  sourceImageNews = this.domaine + '/source/';


  constructor(private _http:HttpClient, public event: EventService) { 

  }
    
  get(uri){
    return this._http.get<any[]|any>(this.uri+uri)
    .pipe(
        catchError((err, caught)=>{
            this.event.wyswietlInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }
    
  post(uri, json){      
      return this._http.post<any[]|any>(this.uri+uri, json)
      .pipe(
        catchError((err, caught)=>{
            this.event.wyswietlInfo('error',err.message);
            throw new Error(err.message)
        })
    )
  }    


}


