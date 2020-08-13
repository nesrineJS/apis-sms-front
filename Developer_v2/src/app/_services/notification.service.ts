import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import {MasterService} from './master.service';

@Injectable()
export class NotificationService extends MasterService{

  url: any = 'http://localhost:3000/core';

  id_developer: any;
  id_app:any;

  constructor(private http: Http) {
    super();
  }

  GetNotifications (id_developer, status): Observable<any[]> {

    return this.http
        .put(this.url + '/developernotification/notify', {id_developer, status},
            { headers: this.headers})
        .map(this.extractData);     

  }

  Status (id_dev_notif): Observable<any[]> {



    return this.http
        .put(this.url + '/developernotification/status/', {id_dev_notif},
            { headers: this.headers})
        .map(this.extractData);     

  }
  
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

}
