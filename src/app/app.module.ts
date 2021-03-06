import { ExposComponent } from './expos/expos.component';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SkinViewComponent} from './skin/skinview.component';
import { ApiService, AuthenticationService } from './services';
import { routing } from './app.routing';
// import { MaterialModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MenubarComponent } from './menubar/menubar.component';
import { AuthGuard } from './guards';
import { RoleGuard } from './guards';
import { AuthoritiesComponent } from './authorities/authorities.component';
import { NgSemanticModule } from 'ng-semantic';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,

    NgSemanticModule,
    // MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SkinViewComponent,
    LoginComponent,
    MenuComponent,
    AuthoritiesComponent,
    ExposComponent,
    MenubarComponent
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    ApiService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
