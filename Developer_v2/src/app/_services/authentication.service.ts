import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Developer } from '../_model/developer';
import { Http, Response, Headers } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {

   url: any = 'http://localhost:3000/core';
    private currentUserSubject: BehaviorSubject <Developer>;
    public currentUser: Observable<Developer>;
    
    

    constructor(private http: Http) {
        this.currentUserSubject = new BehaviorSubject<Developer>(JSON.parse(localStorage.getItem('developer')));
        this.currentUser = this.currentUserSubject.asObservable();
       
    }

    public get currentUserValue(): Developer {

      var md5_developer_id : any =  '';

     if(this.currentUserSubject.value && this.currentUserSubject.value.id_developer)
     {
        md5_developer_id = Md5.hashStr(this.currentUserSubject.value.id_developer);

        if(!sessionStorage.getItem('user_id') || (sessionStorage.getItem('user_id') && sessionStorage.getItem('user_id') != md5_developer_id ) )  
        {
    
          this.VerifToken(this.currentUserSubject.value.id_developer, this.currentUserSubject.value.token).subscribe(respond=>{
        
          if(respond[0].ctl_developer_authentication_token != 1)
          {
            localStorage.clear();
            sessionStorage.clear();
            this.currentUserSubject = new BehaviorSubject<Developer>(JSON.parse(null));
          }
          else
          {
            var user_id = Md5.hashStr(this.currentUserSubject.value.id_developer)
            sessionStorage.setItem('user_id', user_id.toString());
          }          
          });
        }
     }
     else if(!this.currentUserSubject.value || !this.currentUserSubject.value.id_developer )
      {
        localStorage.clear();
        sessionStorage.clear();
        this.currentUserSubject = new BehaviorSubject<Developer>(JSON.parse(null));
      } 
       
      return this.currentUserSubject.value;

    }

    
  VerifToken(id_developer,token): Observable<any[]> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    return this.http.put(this.url + '/developerauthentication/token', {id_developer,token}, {headers: headers})
    .map(this.extractData);

  } 

  logout() {

    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('user_id');

    this.currentUserSubject.next(null);
  }
 
     private extractData(res: Response) {
      let body = res.json();
      return body || [];
    }

    
}
