import { Injectable } from '@angular/core';
import { MasterService } from 'src/app/_services/master.service';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService extends MasterService {

  url= environment.Baseurl;


    constructor(private http: Http) {
      super()
    }

    ViewTypeAuth(id_developer): Observable<any[]> {
    
      return this.http
          .put(this.url + '/developerauthentication/view/', {id_developer}, { headers: this.headers})
          .map(this.extractData);     

    }

    AddTypeAuth(id_developer,id_type_auth,last_date,email,mobile,uid,token,param1,param2): Observable<any[]> {
    
      return this.http
          .put(this.url + '/developerauthentication/add/', {id_developer,id_type_auth,last_date,email,mobile,uid,token,param1,param2}, { headers: this.headers})
          .map(this.extractData);     

    }

    DeleteAuthenticationType(id_developer,id_type_auth): Observable<any[]> {
    
      return this.http
          .put(this.url + '/developerauthentication/status/', {id_developer,id_type_auth}, { headers: this.headers})
          .map(this.extractData);     

    }

    ReloadAuthenticationType(id_developer,id_type_auth): Observable<any[]> {
    
      return this.http
          .put(this.url + '/developerauthentication/generateToken/', {id_developer,id_type_auth}, { headers: this.headers})
          .map(this.extractData);     

    }


    private extractData(res: Response) {
      const body = res.json();
      return body;
    }
     
}
