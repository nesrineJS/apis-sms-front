import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Injectable({
providedIn: 'root'
})
export class LoginService {

   url= environment.Baseurl;

    id_developer: any;
    id_type_auth: any;
    last_date: any;
    email: any;
    mobile: any;
    uid: any;
    token: any;
    param1: any;
    param2: any;
     id_country:any;


    constructor(private http: Http, private myRoute: Router) {}

    GetCheckAuthenticate( id_type_auth,email, uid, token): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put(this.url + '/developerauthentication/checkAutentication', {
        id_type_auth,email, uid, token
        }, {headers: headers})
        .map(this.extractData);    
        }


    GetAuthenticate(firstname, lastname, mobile, username, id_country, email, address,
      company, birthday_date, profile_picture, password, id_devise, sexe,
      id_type_auth, uid, token, param1, param2): Observable<any> {
              const headers = new Headers();
              headers.append('Content-Type', 'application/json');

              return this.http.put(this.url + '/developerauthentication/add/social', {
              firstname, lastname, mobile, username, id_country, email, address, company, birthday_date,
              profile_picture, password, id_devise, sexe, id_type_auth, uid, token, param1, param2
              }, {headers: headers}).map(this.extractData);

      }

      
        VerifToken(id_developer,token): Observable<any[]> {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            
            return this.http.put(this.url + '/developerauthentication/token', {id_developer,token}, {headers: headers})
            .map(this.extractData);         
            }


          private extractData(res: Response) {
          const body = res.json();
          return body;
          }
}
