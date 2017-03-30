import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule, MenuItem } from 'primeng/primeng';

@Component({
    selector: 'my-menubar',
    templateUrl: 'menubar.component.html',
    styleUrls: ['menubar.component.scss']
})

export class MenubarComponent implements OnInit {
    private items: MenuItem[];

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.items = [
            {
                label: 'Accueil',
                items: [{
                        label: 'New', 
                        icon: 'fa-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            }
        ];
    }
}