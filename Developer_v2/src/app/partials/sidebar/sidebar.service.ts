import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  visible: boolean;
  _hasBackgroundImage = true;

  toggled = false;
  menus = [
    {
      title: 'Name',
      icon: 'fa fa-list',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Summary ',
          icon: 'fa fa-dashboard ',
        },
        {
          title: 'Sending Box',
          icon: 'fa fa-inbox',
        },
        {
          title: 'Api',
           icon: 'fa fa-code',
        },
        {
          title: 'Amount',
           icon: 'fa fa-money',
        },
        {
          title: 'Statistics',
           icon: 'fa fa-bar-chart-o',
        },
        {
          title: 'Share With',
           icon: 'fa fa-share-alt-square',
        },
        {
          title: 'Settings',
           icon: 'fa fa-cog',
        }
      ]
    },
    {
      title: 'Genral Menu',
      icon: 'fa fa-book',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Dashboard ',
          icon: 'fa fa-dashboard ',
        },
        {
          title: 'Sending Box',
          icon: 'fa fa-inbox',
        },
        {
          title: 'Applications',
           icon: 'fa fa-cube',
        },
        {
          title: 'Amount',
           icon: 'fa fa-money',
        },
        {
          title: 'Statistics',
           icon: 'fa fa-bar-chart-o',
        }
      ]
    },
    {
      title: 'Account',
      icon: 'mdi mdi-television',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
      submenus: [
        {
          title: '',
          icon: 'fa fa-user',
        },
        {
          title: 'Privacy',
          icon: 'fa fa-lock',
        },
        {
          title: 'Sender',
          icon: 'fa fa-send',
        },
        {
          title: 'Invoices',
          icon: 'fa fa-money',
        },
        {
          title: 'Add Amount',
          icon: 'fa fa-plus',
        },
        {
          title: 'Sign Out',
          icon: 'fa fa-sign-out',
        }
      ]
    },
  

  ];

  constructor() {
     this.visible = false; }

     toggle() {
      this.toggled = ! this.toggled;
    }
    getSidebarState() {
      return this.toggled;
    }
    setSidebarState(state: boolean) {
      this.toggled = state;
    }
  
    getMenuList() {
      return this.menus;
    }
  
    get hasBackgroundImage() {
      return this._hasBackgroundImage;
    }
  
    set hasBackgroundImage(hasBackgroundImage) {
      this._hasBackgroundImage = hasBackgroundImage;
    }
  
  HideSide() { this.visible = false; }
  ShowSide() { this.visible = true ; }}
