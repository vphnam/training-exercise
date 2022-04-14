import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ShowPoComponent } from './purchase-order/show-po/show-po.component';
import { DetailPoComponent } from './purchase-order/detail-po/detail-po.component';
import { SharedService } from './services/shared.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoDetailFormComponent } from './purchase-order/detail-po/po-detail-form/po-detail-form.component';
import { PolListComponent } from './purchase-order/detail-po/pol-list/pol-list.component';
import { SendMailComponent } from './purchase-order/send-mail/send-mail.component';
import { PoListComponent } from './purchase-order/send-mail/po-list/po-list.component';
import { SendMailFormComponent } from './purchase-order/send-mail/send-mail-form/send-mail-form.component';
import { SearchfilterPipe } from './pipe/searchfilter.pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { AddPoComponent } from './purchase-order/show-po/add-po/add-po.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './services/loader/interceptor.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './user/login/login.component'
import { ValidatorService} from './services/custom-validator/validator.service';
import { JwtInterceptor} from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseOrderComponent,
    ShowPoComponent,
    DetailPoComponent,
    PoDetailFormComponent,
    PolListComponent,
    SendMailComponent,
    PoListComponent,
    SendMailFormComponent,
    SearchfilterPipe,
    AddPoComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}, SharedService, ValidatorService, SearchfilterPipe, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
