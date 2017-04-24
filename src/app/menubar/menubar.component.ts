import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
    selector: 'my-menubar',
    templateUrl: 'menubar.component.html',
    styleUrls: ['menubar.component.scss']
})

export class MenubarComponent implements OnInit {
    private items = [];

    // constructor(private router: Router) {
    constructor() {

    }

    ngOnInit() {
        this.items = [];
    }
}
