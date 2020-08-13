import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Developer, Application } from '../_model/';

@Component({
  template:''
 })

export class SuperComponent implements OnInit {

  protected id_developer : any;
  protected id_app : any;
  protected name_app : any;
  protected name_developer : any;
  protected image_developer:any;
  protected date_developer:any;
  protected isSlideBar_application: boolean = false;  
  protected sessionToken:any;
  private currentUserSubject: BehaviorSubject <Developer>;
  private currentApplicationSubject: BehaviorSubject <Application>;


  
  constructor() { 

        this.id_app = '0';
        this.id_developer = '';
        this.name_developer="";
        this.image_developer="";
        this.sessionToken="";

        this.isSlideBar_application = false;
    
        this.currentUserSubject = new BehaviorSubject<Developer>(JSON.parse(localStorage.getItem('developer')));
        this.currentApplicationSubject = new BehaviorSubject<Application>(JSON.parse(sessionStorage.getItem('application')));


        if(this.currentUserSubject.value && this.currentUserSubject.value.id_developer)
        {
          this.id_developer = this.currentUserSubject.value.id_developer;
          this.name_developer = this.currentUserSubject.value.name;
          this.image_developer = this.currentUserSubject.value.image;
          this.date_developer = this.currentUserSubject.value.entry_date;

        }

        if(this.currentApplicationSubject.value && this.currentApplicationSubject.value.id_app)
        {
          this.id_app = this.currentApplicationSubject.value.id_app;
          this.name_app = this.currentApplicationSubject.value.name;
          this.isSlideBar_application = true;
        }

  }

  ngOnInit() {}

}
