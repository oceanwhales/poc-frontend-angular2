import { SkinExpoObjects } from '../models/SkinExpoObjects';
import {Injectable} from '@angular/core';
import {SkinObject} from '../models/SkinObject';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {SkinAuthority} from '../models/SkinAuthority';
import {SkinExpo} from '../models/SkinExpo';

@Injectable()
export class ApiService {
    private restApiEndpoint: string = 'http://localhost:9001';
    private http: Http;
    private readerHeaders: Headers = new Headers();
    private writerHeaders: Headers = new Headers();
    skinObjects: SkinObject[] = [
        {
            authority: {firstName: 'John', lastName: 'Smith'},
            titles: ['test1', 'test2']
        }
    ];

    constructor(http: Http) {
        this.http = http;
        this.readerHeaders = new Headers();
        this.readerHeaders.append('TOKEN', localStorage.getItem('currentUser'));
        this.writerHeaders = new Headers();
        this.writerHeaders.append('TOKEN', localStorage.getItem('currentUser'));
    }

    initHeaders() {
        this.readerHeaders = new Headers();
        this.readerHeaders.append('TOKEN', localStorage.getItem('currentUser'));
        this.writerHeaders = new Headers();
        this.writerHeaders.append('TOKEN', localStorage.getItem('currentUser'));
    }
    // nuxeoService: NuxeoService = new NuxeoService();

    getSkinObjects() {
        return this.http.get(`${this.restApiEndpoint}/skinObject`, {headers: this.readerHeaders})
            .map((response: Response) => {
                return response.json()._embedded.skinObjects;
            })
            .map(skinObjects => {
                return skinObjects.map(item => {
                    let result: SkinObject = item as SkinObject;
                    this.getAuthority(item._links.authority.href)
                        .subscribe(authority => result.authority  = authority);
                    return result;
                });
            })
            .catch(this.handleError);
    }

    getSkinObject(skinObjectUrl: string): Observable<SkinObject> {
        // let skinObject;
        return this.http.get(skinObjectUrl, {headers: this.readerHeaders})
                .map(response => {
                    console.log('skinObject: ', response.json());
                    return response.json() as SkinObject;
                })
                .publish().refCount()
                .catch(this.handleError);
    }

    getAuthority(authorityUrl: string): Observable<SkinAuthority> {
        // let resauthority;
        return this.http.get(authorityUrl, {headers: this.readerHeaders})
                .map(response => {
                    console.log('authority: ', response.json());
                    return response.json() as SkinAuthority;
                })
                .publish().refCount()
                .catch(this.handleError);
    }

    setSkinOjbect(skinObject: SkinObject, link: string) {
        console.log('SAVE SKIN OBJECT', skinObject , link);
        this.http.put(link, skinObject, {headers: this.writerHeaders})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    deleteSkinOjbect(link: string) {
        console.log('DELETE SKIN OBJECT' + link);
        this.http.delete(link, {headers: this.writerHeaders})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getSkinAuthorities() {
       return this.http.get(`${this.restApiEndpoint}/authorities`, {headers: this.readerHeaders})
            .map((response: Response) => {
                console.log('getSkinAuthorities' + response.json()._embedded.authorities);
                return response.json()._embedded.authorities;
            })
            .catch(this.handleError);
    }

    setSkinAuthority(skinAuthority: SkinAuthority, link: string) {
        console.log(' SAVE SKIN AUTHORITY', skinAuthority , link);
        this.http.put(link, skinAuthority, {headers: this.writerHeaders})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getSkinExpos() {
       return this.http.get(`${this.restApiEndpoint}/expo`, {headers: this.readerHeaders})
            .map((response: Response) => {
                return response.json()._embedded.expos;
            })
            .map(skinExpos => {
                return skinExpos.map(item => {
                    let result: SkinExpo = item as SkinExpo;

                    result.expoObjects = item.expoObjects.map(expoObject => {
                        let resultExpoObjects: SkinExpoObjects = new SkinExpoObjects();
                        resultExpoObjects.order = expoObject.order;
                        this.getSkinObject(expoObject._links.object.href)
                            .subscribe(skinObject => {
                                resultExpoObjects.skinObject = skinObject;
                            });
                        return resultExpoObjects;
                    });

                    return result;
                });
            })
            .publish().refCount()
            .catch(this.handleError);
    }

    setSkinExpo(skinExpo: SkinExpo, link: string) {
        console.log('SAVE SKIN EXPO ACHTUNG', skinExpo , link);
        this.http.put(link, skinExpo, {headers: this.writerHeaders})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
