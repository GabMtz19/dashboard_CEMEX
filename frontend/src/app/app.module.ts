import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AnalyticsService } from './services/analytics.service';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CmxAPIInterceptor } from './interceptors/cmxAPI.interceptor';
import { CmxWebComponentsModule } from '@cmx-web-components/angular';
import { CountryService } from './services/countries.service';
import { HeaderUtilsComponent } from './header-utils/header-utils.component';
import { LegalEntityService } from './services/legal-entity.service';
import { LoginComponent } from './views/login/login.component';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { PagenotfoundComponent } from './views/pagenotfound/pagenotfound.component';
import { SessionService } from './services/session.service';
import { SharedPipeModule } from './pipes/pipes.module';
import { TranslationService } from './services/translation.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CmxWebComponentsModule.forRoot(),
        NgxGaugeModule,
        AkitaNgDevtools,
        SharedPipeModule,
    ],
  declarations: [
    AppComponent,
    NavComponent,
    HeaderUtilsComponent,
    PagenotfoundComponent,
    LoginComponent,
    AppLayoutComponent,
  ],
  providers: [
    TranslationService,
  { provide: HTTP_INTERCEPTORS, useClass: CmxAPIInterceptor, multi: true },
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  LegalEntityService,
  CountryService,
  AnalyticsService,
  SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        //
    }
}
