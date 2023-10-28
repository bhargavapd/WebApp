import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomInterceptor } from './interceptors/custom-interceptor.interceptor';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    LoaderComponent,
    SuccessComponent,
    FailureComponent,
    CustomDialogComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents:[
    CustomDialogComponent
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
