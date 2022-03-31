import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { DetailPoComponent } from './purchase-order/detail-po/detail-po.component';
import { SendMailComponent } from './purchase-order/send-mail/send-mail.component';
const routes: Routes = [
  {path:'purchase-order', component:PurchaseOrderComponent },
  {path: 'purchase-order/detail-po/:no', component:DetailPoComponent},
  {path: 'purchase-order/send-mail/:no', component: SendMailComponent}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
