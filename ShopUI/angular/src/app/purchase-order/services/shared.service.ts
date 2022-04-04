import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  
  //Purchase order http methods
  getPurchaseOrderList(): Observable<any[]>{
    return this.http.get<Po[]>(this.APIUrl + '/PurchaseOrder');
  }
  getOneRecordPurchaseOrderByOrderNo(val: any): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/PurchaseOrder/'+ val);  
  }
  addPurchaseOrder(val:any){
    return this.http.post(this.APIUrl + '/PurchaseOrder',val);
  }
  updatePurchaseOrder(val:any){
    return this.http.put(this.APIUrl + '/PurchaseOrder',val);
  }
  deletePurchaseOrder(val:any){
    return this.http.delete(this.APIUrl + '/PurchaseOrder/'+ val);
  }
  cancelPurchaseOrder(val:number){
    return this.http.post(this.APIUrl + '/PurchaseOrder/cancel-purchase-order',val);
  }
  //Purchase order line http methods
  getPurchaseOrderLineList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/PurchaseOrderLine');
  }
  getOneRecordPurchaseLineOrder(val: any){
    return this.http.get<any>(this.APIUrl + '/PurchaseOrderLine', val);
  } 
  getPurchaseLineOrder(val: any){
    return this.http.get<any>(this.APIUrl + '/PurchaseOrderLine', val);
  } 
  getRecordsPurchaseLineOrderByOrderNo(val: any){
    return this.http.get<Pol>(this.APIUrl + '/PurchaseOrderLine/purchaseorder/'+ val);
  }
  addPurchaseOrderLine(val:any){
    return this.http.post(this.APIUrl + '/PurchaseOrderLine',val);
  }
  updatePurchaseOrderLine(val:any){
    return this.http.put(this.APIUrl + '/PurchaseOrderLine',val);
  } 
  deletePurchaseOrderLine(val:any){
    return this.http.post(this.APIUrl + '/PurchaseOrderLine/del', val);
  }

  setQtyAndPriceOfAllGivenPolToZero(val: any)
  {
    return this.http.put(this.APIUrl + '/PurchaseOrderLine/update-list', val);
  }
  //Part http methods
  getPartList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Part');
  }
  getPartListNotInPurchaseOrder(val: any){
    return this.http.get<any>(this.APIUrl + '/Part/'+ val);
  }

  //Purchase order and purchase order line http methods
  Savechanges2Table(val:any){
    return this.http.post(this.APIUrl + '/PoAndPol',val);
  }

  sendMail(val:any){
    return this.http.post(this.APIUrl + '/Mail',val);
  }
  

}

export interface Pol{
  PartNo: number;
  OrderNo: number;
  PartDescription: string;
  Manufacturer: string;
  QuantityOrder: number;
  BuyPrice:number;
  OrderDate: string;
  MeMo: string;
  Amount: Number;
}

export interface Po{
  OrderNo: number;
  SupplierNoNavigation:[
      SupplierNo: number,
      SupplierName: string,
      Email: string
  ],
  StockSiteNavigation:[
    StockSite1: string,
    Email: string,
    test: string
  ],
  StockName: string;
  OrderDate: Date;
  Note: string;
  Address: string,
  County: string,
  PostCode: string,
  SentMail: boolean,
  Status: boolean
}