import { Component } from '@angular/core';
import {  Compiler } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private _compiler: Compiler){    
    this._compiler.clearCache();
  }
  title = 'API SMS';
 
}
