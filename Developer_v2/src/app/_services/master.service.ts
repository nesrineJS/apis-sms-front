import {Headers} from '@angular/http';


export class MasterService {

  x_access_token : any;
  headers: any;

  constructor() {
    this.x_access_token = sessionStorage.getItem('x-access-token');

    this.headers = new Headers({'x-access-token': this.x_access_token});
    this.headers.append('Content-Type', 'application/json');
  }
}
