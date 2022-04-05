import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ShowPoComponent } from './purchase-order/show-po/show-po.component';
import { DetailPoComponent } from './purchase-order/detail-po/detail-po.component';
import { SharedService } from './services/shared.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoDetailFormComponent } from './purchase-order/detail-po/po-detail-form/po-detail-form.component';
import { PolListComponent } from './purchase-order/detail-po/pol-list/pol-list.component';
import { SendMailComponent } from './purchase-order/send-mail/send-mail.component';
import { PoListComponent } from './purchase-order/send-mail/po-list/po-list.component';
import { SendMailFormComponent } from './purchase-order/send-mail/send-mail-form/send-mail-form.component';
import { SearchfilterPipe } from './pipe/searchfilter.pipe';
import { NgxPaginationModule} from 'ngx-pagination';
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
    SearchfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
