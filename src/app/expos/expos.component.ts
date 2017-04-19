import {Component, OnInit} from '@angular/core';
import {SkinExpo} from '../models/SkinExpo';
import {ApiService} from '../services';

@Component({
    selector: 'expos',
    templateUrl: './expos.component.html',
    styleUrls: ['../skin/skinview.component.scss']
})
export class ExposComponent implements OnInit {
    skinExpos: SkinExpo[];
    selectedExpo: SkinExpo;
    rolesWriter: boolean;

    constructor(private api: ApiService) {
        this.skinExpos = new Array<SkinExpo>();
        this.rolesWriter = localStorage.getItem('userRoles').indexOf('ROLE_WRITE') >= 0;
        if(this.rolesWriter){
            this.selectedExpo = new SkinExpo();
        }
    }

    ngOnInit() {
        this.api.getSkinExpos().subscribe(items => items.forEach(it => this.skinExpos.push(it)));
    }

    onSelect(skinExpo: SkinExpo): void {
        this.selectedExpo = skinExpo;
    }

    save(selectedExpo): void {
        console.log('selectedExpo');
        console.log(selectedExpo);
        let postObject = new SkinExpo();
        postObject.title = selectedExpo.title;
        postObject.location = selectedExpo.location;

        this.api.setSkinExpo(postObject, selectedExpo._links.self.href);
    }
}
