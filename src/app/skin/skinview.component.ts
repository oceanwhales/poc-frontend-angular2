import {Component, OnInit} from '@angular/core';
import {SkinObject} from '../models/SkinObject';
import {ApiService} from '../services';

@Component({
    selector: 'skin-view',
    templateUrl: './skinview.component.html',
    styleUrls: ['./skinview.component.scss']
})
export class SkinViewComponent implements OnInit {
    skinObjects: SkinObject[];
    name = '';
    selectedObject: SkinObject;
    rolesWriter: boolean;

    constructor(private api: ApiService) {
        this.skinObjects = [];
        this.rolesWriter = localStorage.getItem('userRoles').includes('ROLE_WRITE');
    }

    ngOnInit() {
        console.log('Hello skin view ');
        this.api.getSkinObjects().subscribe(items => items.forEach(it => this.skinObjects.push(it)));
    }

    onSelect(skinObject: SkinObject): void {
        this.selectedObject = skinObject;
    }

    save(selectedObject): void {
        console.log('selectedObject');
        console.log(selectedObject);
        let postObject = new SkinObject();
        postObject.titles = [selectedObject.titles];
        postObject.authority = selectedObject._links.authority.href;

        this.api.setSkinOjbect(postObject, selectedObject._links.self.href);
    }

    delete(selectedObject): void {
        console.log('delete object');

        this.api.deleteSkinOjbect(selectedObject._links.self.href);
    }
}
