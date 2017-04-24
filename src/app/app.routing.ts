import { RouterModule, Routes } from '@angular/router';

// import { MenuComponent } from './menu/menu.component';
import { ExposComponent } from './expos/expos.component';
import { AboutComponent } from './about/about.component';
import { MenubarComponent } from './menubar/menubar.component';
import { SkinViewComponent } from './skin/skinview.component';
import { LoginComponent } from './login/login.component';
import { AuthoritiesComponent } from './authorities/authorities.component';
// import { AuthGuard } from './guards';
import { RoleGuard } from './guards';

const routes: Routes = [
  // { path: '', component: MenuComponent, canActivate: [AuthGuard]},
  { path: '', component: SkinViewComponent},
  { path: 'about', component: AboutComponent},
  { path: 'menubar', component: MenubarComponent},
  // { path: 'skin-view', component: SkinViewComponent, canActivate: [RoleGuard,AuthGuard]},
  { path: 'skin-view', component: SkinViewComponent},
  { path: 'my-login', component: LoginComponent},
  { path: 'authorities', component: AuthoritiesComponent, canActivate: [RoleGuard]},
  { path: 'expos', component: ExposComponent, canActivate: [RoleGuard]}
];

export const routing = RouterModule.forRoot(routes);