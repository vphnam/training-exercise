import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { DetailPoComponent } from './purchase-order/detail-po/detail-po.component';
import { SendMailComponent } from './purchase-order/send-mail/send-mail.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './helpers/AuthGuard';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'purchase-order', component:PurchaseOrderComponent, canActivate: [AuthGuard]},
  {path: 'purchase-order/detail-po/:no', component:DetailPoComponent},
  {path: 'purchase-order/send-mail/:no', component: SendMailComponent},
  {path: 'user/login', component: LoginComponent},
  {path: '**', pathMatch:"full", component:ErrorComponent},
  {path: 'error', pathMatch:"full", component:ErrorComponent}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
