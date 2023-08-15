import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpErrorResponse } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { LeftMenuComponent } from './components/core/left-menu/left-menu.component';
import { MsalLoginComponent } from './components/core/msal-login/msal-login.component';
import { AccessDeniedComponent } from './components/core/access-denied/access-denied.component';
import { SessionTimeoutComponent } from './components/core/session-timeout/session-timeout.component';
import { HomeComponent } from './components/core/home/home.component';
import { CommonModule, DatePipe } from '@angular/common';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { MSAL_INSTANCE, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthGuard } from './guard/auth.guard';
import { InterceptorService } from './shared/auth/interceptor.service';
import { LoginPageComponent } from './components/core/login-page/login-page.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  const objEnv = environment.returnParameters();
  return new PublicClientApplication({
    auth: {
      clientId: objEnv.msalClientId,
      // authority: `https://login.microsoftonline.com/${objEnv.msalTenantId}`,
      redirectUri: objEnv.redirectUri
    }
  })
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftMenuComponent,
    MsalLoginComponent,
    AccessDeniedComponent,
    SessionTimeoutComponent,
    HomeComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },

    MsalService,
    MsalBroadcastService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
