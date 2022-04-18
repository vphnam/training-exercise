import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { ShowPoComponent } from './components/purchase-order/show-po/show-po.component';
import { DetailPoComponent } from './components/purchase-order/detail-po/detail-po.component';
import { SharedService } from './services/shared.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoDetailFormComponent } from './components/purchase-order/detail-po/po-detail-form/po-detail-form.component';
import { PolListComponent } from './components/purchase-order/detail-po/pol-list/pol-list.component';
import { SendMailComponent } from './components/purchase-order/send-mail/send-mail.component';
import { PoListComponent } from './components/purchase-order/send-mail/po-list/po-list.component';
import { SendMailFormComponent } from './components/purchase-order/send-mail/send-mail-form/send-mail-form.component';
import { SearchfilterPipe } from './pipe/searchfilter.pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { AddPoComponent } from './components/purchase-order/show-po/add-po/add-po.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './services/loader/interceptor.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './components/user/login/login.component'
import { ValidatorService} from './services/custom-validator/validator.service';
import { JwtInterceptor} from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './home/home.component';
import { RaiseAlertService } from './services/raise-alert/raise-alert.service';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CreateSupplierComponent } from './components/create-supplier/create-supplier.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SearchByNoFilterPipe } from './pipe/search-by-no-filter.pipe';
import { SupplierCreateComponent } from './components/supplier-create/supplier-create.component';

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
    HomeComponent,
    SupplierComponent,
    CreateSupplierComponent,
    SupplierListComponent,
    SearchByNoFilterPipe,
    SupplierCreateComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}, 
    SharedService, ValidatorService, SearchfilterPipe, AuthenticationService,RaiseAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
