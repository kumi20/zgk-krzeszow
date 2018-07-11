import { ToastModule } from './typescripts/pro/alerts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MDBBootstrapModule } from './typescripts/free';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { AppComponent } from './app.component';
import { MDBSpinningPreloader } from './typescripts/pro/index';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { GoogleAnalyticsModule, GA_TOKEN } from 'angular-ga';

import { ApiService } from './api.service';
import { EventService } from './event.service';
import { routerModule} from './app.routing';

import { DashboardComponent} from './dashboard/dashboard.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { WraperComponentComponent } from './wraper-component/wraper-component.component';
import { TemplateModule } from './template/template.module';


@NgModule({
	declarations: [
		AppComponent,
        DashboardComponent,
        DynamicComponentComponent,
        WraperComponentComponent
	],
	imports: [
		BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        routerModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TemplateModule,
        ToastModule.forRoot(),
        GoogleAnalyticsModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        MDBBootstrapModulePro.forRoot(),
	],
	providers: [ApiService, EventService],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }




