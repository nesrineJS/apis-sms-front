import { Component} from '@angular/core';
import { SuperComponent } from './super.component';


@Component({
  template:''
})

export class MenuComponent  extends SuperComponent{

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
