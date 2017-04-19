import {Component, OnInit} from '@angular/core';
import {SkinAuthority} from '../models/SkinAuthority';
import {ApiService} from '../services';

@Component({
    selector: 'authorities',
    templateUrl: './authorities.component.html',
    styleUrls: ['../skin/skinview.component.scss']
})
export class AuthoritiesComponent implements OnInit {
    skinAuthorities: SkinAuthority[];
    selectedAuthority: SkinAuthority;
    rolesWriter: boolean;

    constructor(private api: ApiService) {
        this.skinAuthorities = new Array<SkinAuthority>();
        this.rolesWriter = localStorage.getItem('userRoles').indexOf('ROLE_WRITE') >= 0;
        if(this.rolesWriter){
            this.selectedAuthority = new SkinAuthority();
        }
    }

    ngOnInit() {
        console.log('Hello skin view');
        this.api.getSkinAuthorities().subscribe(items => items.forEach(it => this.skinAuthorities.push(it)));
    }

    onSelect(skinAuthority: SkinAuthority): void {
        this.selectedAuthority = skinAuthority;
    }

    save(selectedAuthority): void {
        console.log('selectedAuthority');
        console.log(selectedAuthority);
        let postObject = new SkinAuthority();
        postObject.firstName = selectedAuthority.firstName;
        postObject.lastName = selectedAuthority.lastName;

        this.api.setSkinAuthority(postObject, selectedAuthority._links.self.href);
    }
}
