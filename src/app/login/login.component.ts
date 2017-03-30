import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/primeng';

import { AuthenticationService, ApiService } from '../services/index';


@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    loginCarouselImages: string[];

    constructor(
        // private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private apiService: ApiService
      ) {
        this.loginCarouselImages = [ '/img/snb-1.jpeg', '/img/snb-2.jpeg', '/img/snb-3.jpeg' ];
        // this.loginCarouselImages = [ '/img/cuba_plage1.jpeg', '/img/cuba_plage2.jpeg' ];
      }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        // this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                  console.log(data)
                  localStorage.setItem('currentUser', data[0]);
                  localStorage.setItem('userRoles', data[1]);
                  // this.router.navigate([this.returnUrl]);
                  this.apiService.initHeaders();
                  this.router.navigate(['']);
                },
                error => {
                    console.log('error ' + error);
                    this.loading = false;
                });
    }
}