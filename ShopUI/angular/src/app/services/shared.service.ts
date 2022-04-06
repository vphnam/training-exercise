import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';
import { Part, Po, Pol, ResultViewModel, StockSite, Supplier } from 'src/app/services/interface.service';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
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
  getOneRecordPurchaseOrderByOrderNo(val: any): Observable<Po>{
    return this.http.get<Po>(this.APIUrl + '/PurchaseOrder/'+ val);  
  }
  addPurchaseOrder(val:any){
    return this.http.post<ResultViewModel>(this.APIUrl + '/PurchaseOrder',val);
  }
  updatePurchaseOrder(val:any){
    return this.http.put<ResultViewModel>(this.APIUrl + '/PurchaseOrder',val);
  }
  deletePurchaseOrder(val:any){
    return this.http.delete<ResultViewModel>(this.APIUrl + '/PurchaseOrder/'+ val);
  }
  cancelPurchaseOrder(val:number){
    return this.http.post<ResultViewModel>(this.APIUrl + '/PurchaseOrder/cancel-purchase-order',val);
  }
  //Purchase order line http methods
  getPurchaseOrderLineList(): Observable<any[]>{
    return this.http.get<Pol[]>(this.APIUrl + '/PurchaseOrderLine');
  }
  getOneRecordPurchaseLineOrder(val: any){
    return this.http.get<Pol>(this.APIUrl + '/PurchaseOrderLine', val);
  } 
  getRecordsPurchaseLineOrderByOrderNo(val: any){
    return this.http.get<Pol>(this.APIUrl + '/PurchaseOrderLine/purchaseorder/'+ val);
  }
  addPurchaseOrderLine(val:any){
    return this.http.post<ResultViewModel>(this.APIUrl + '/PurchaseOrderLine',val);
  }
  updatePurchaseOrderLine(val:any){
    return this.http.put<ResultViewModel>(this.APIUrl + '/PurchaseOrderLine',val);
  } 
  deletePurchaseOrderLine(val:any){
    return this.http.post<ResultViewModel>(this.APIUrl + '/PurchaseOrderLine/del', val);
  }

  setQtyAndPriceOfAllGivenPolToZero(val: any)
  {
    return this.http.put<ResultViewModel>(this.APIUrl + '/PurchaseOrderLine/update-list', val);
  }
  //Part http methods
  getPartList(): Observable<any[]>{
    return this.http.get<Part[]>(this.APIUrl + '/Part');
  }
  getPartListNotInPurchaseOrder(val: any){
    return this.http.get<Part[]>(this.APIUrl + '/Part/'+ val);
  }

  //Supplier http methods
  getSupplierList(): Observable<any[]>{
    return this.http.get<Supplier[]>(this.APIUrl + '/Supplier');
  }

  //StockSite http methods
  getStockSiteList(): Observable<any[]>{
    return this.http.get<StockSite[]>(this.APIUrl + '/StockSite');
  }

  //Purchase order and purchase order line http methods
  Savechanges2Table(val:any){
    return this.http.post<ResultViewModel>(this.APIUrl + '/PoAndPol',val);
  }

  sendMail(val:any){
    return this.http.post<ResultViewModel>(this.APIUrl + '/Mail',val);
  }
  orderDateValidator(d: FormControl){
    try
    {
      var today = new Date();
      const date = formatDate(today, "MM-dd-yyyy",'en_US');
      const od = formatDate(d.value, "MM-dd-yyyy",'en_US');
      if(date < od){
        return {orderDateValidator: {invalid:true}};
      }
      else
      {
        return null;
      }
    }
    catch
    {
      return {orderDateValidator: {invalid:true}};
    }
  }
}