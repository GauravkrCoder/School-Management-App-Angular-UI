import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { PrimengUiComponentsModule } from './primeng-ui-components.module';
import { MsalLoginComponent } from './components/core/msal-login/msal-login.component';
import { AccessDeniedComponent } from './components/core/access-denied/access-denied.component';
import { SessionTimeoutComponent } from './components/core/session-timeout/session-timeout.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guard/auth.guard';
import { RolesDefined } from './shared/statics/roles-constants';
import { DatePipe } from '@angular/common';
import { LoginPageComponent } from './components/core/login-page/login-page.component';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  // { path: '', component: MsalLoginComponent },
  { path: 'msal', component: MsalLoginComponent },
  { path: 'session-timeout', component: SessionTimeoutComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module')
          .then(mod => mod.DashboardModule),
        canActivate: [AuthGuard],
        data: {
          requiredRole: [RolesDefined.viewAll]
        }
      },
      {
        path: 'project', loadChildren: () => import('./components/project/project.module')
          .then(mod => mod.ProjectModule),
        canActivate: [AuthGuard],
        data: {
          requiredRole: [RolesDefined.viewAll, RolesDefined.manageAdmin]
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PrimengUiComponentsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    PrimengUiComponentsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
