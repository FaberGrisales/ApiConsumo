import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {

  private URL_API = "http://190.60.101.59:6003/"

  constructor( private http: HttpClient ) { }

  public getPersonById ( id : number) : Observable<any> {
    return this.http.get(`${this.URL_API}api/get/${id}`);
  }

  public savePersonData ( data : any ) : Observable<any> {
    return this.http.post(`${this.URL_API}api/personas`, data);
  }

}
