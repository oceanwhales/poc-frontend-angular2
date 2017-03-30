import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'my-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello About');
  }
}
