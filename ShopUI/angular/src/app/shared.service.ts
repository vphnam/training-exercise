import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:5001/api";
  constructor(private http:HttpClient) { }

  //Purchase order http methods
  getPurchaseOrderList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/PurchaseOrder');
  }
  getOneRecordPurchaseOrder(val: any){
    return this.http.get<any>(this.APIUrl + 'PurchaseOrder', val);
  }
  addPurchaseOrder(val:any){
    return this.http.post(this.APIUrl + 'PurchaseOrder',val);
  }
  updatePurchaseOrder(val:any){
    return this.http.put(this.APIUrl + 'PurchaseOrder',val);
  }
  deletePurchaseOrder(val:any){
    return this.http.delete(this.APIUrl + 'PurchaseOrder', val);
  }

  //Purchase order line http methods
  getPurchaseOrderLineList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/PurchaseOrderLine');
  }
  getOneRecordPurchaseLineOrder(val: any){
    return this.http.get<any>(this.APIUrl + 'PurchaseOrderLine', val);
  }
  getOneRecordPurchaseLineOrderByOrderNo(val: any){
    return this.http.get<any>(this.APIUrl + 'PurchaseOrderPurchaseOrderLine/purchaseorder', val);
  }
  addPurchaseOrderLine(val:any){
    return this.http.post(this.APIUrl + 'PurchaseOrderLine',val);
  }
  updatePurchaseOrderLine(val:any){
    return this.http.put(this.APIUrl + 'PurchaseOrderLine',val);
  }
  deletePurchaseOrderLine(val:any){
    return this.http.delete(this.APIUrl + 'PurchaseOrderLine', val);
  }

  //Purchase order and purchase order line http methods
  Savechanges2Table(val:any){
    return this.http.post(this.APIUrl + 'PoAndPol',val);
  }
}
