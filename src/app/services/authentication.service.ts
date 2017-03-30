import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('http://localhost:9001/login', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
              if (response.json().token == null) {
                console.log('login FAILED');
              } else {
                console.log('login OK');
                console.log(response.json().token);
                return [response.json().token, response.json().roles];
              }
            })

            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.from('true');
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        console.log('logout not yet implemented');
    }
}
