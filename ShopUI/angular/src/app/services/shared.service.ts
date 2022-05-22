import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';
import { IErrorPageModel, IPart, IPo, IPol, IPoShow, IResultViewModel, IStockSite, ISupplier } from 'src/app/services/interface/interface.service'
import { LoaderService } from './loader/loader.service';
import { Supplier } from '../models/supplier';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = environment.apiUrl;
  constructor(private http:HttpClient, private loader: LoaderService) {

  }
  
  //Purchase order http methods
  getPurchaseOrderList(): Observable<IPo[]>{
    return this.http.get<IPo[]>(this.APIUrl + '/PurchaseOrder');
  }
  getPurchaseOrderListToShow(): Observable<IPoShow[]>{
    return this.http.get<IPoShow[]>(this.APIUrl + '/PurchaseOrder');
  }
  getOneRecordPurchaseOrderByOrderNo(val: any): Observable<IPo>{
    return this.http.get<IPo>(this.APIUrl + '/PurchaseOrder/'+ val);  
  }
  addPurchaseOrder(val:any){
    return this.http.post<IResultViewModel>(this.APIUrl + '/PurchaseOrder',val);
  }
  updatePurchaseOrder(val:any){
    return this.http.put<IResultViewModel>(this.APIUrl + '/PurchaseOrder',val);
  }
  deletePurchaseOrder(val:any){
    return this.http.delete<IResultViewModel>(this.APIUrl + '/PurchaseOrder/'+ val);
  }
  cancelPurchaseOrder(val:number){
    return this.http.post<IResultViewModel>(this.APIUrl + '/PurchaseOrder/cancel-purchase-order',val);
  }
  //Purchase order line http methods
  getPurchaseOrderLineList(): Observable<any[]>{
    return this.http.get<IPol[]>(this.APIUrl + '/PurchaseOrderLine');
  }
  getOneRecordPurchaseLineOrder(val: any){
    return this.http.get<IPol>(this.APIUrl + '/PurchaseOrderLine', val);
  } 
  getRecordsPurchaseLineOrderByOrderNo(val: any){
    return this.http.get<IPol[]>(this.APIUrl + '/PurchaseOrderLine/purchaseorder/'+ val);
  }
  addPurchaseOrderLine(val:any){
    return this.http.post<IResultViewModel>(this.APIUrl + '/PurchaseOrderLine',val);
  }
  updatePurchaseOrderLine(val:any){
    return this.http.put<IResultViewModel>(this.APIUrl + '/PurchaseOrderLine',val);
  } 
  deletePurchaseOrderLine(val:any){
    return this.http.post<IResultViewModel>(this.APIUrl + '/PurchaseOrderLine/del', val);
  }

  setQtyAndPriceOfAllGivenPolToZero(val: any)
  {
    return this.http.put<IResultViewModel>(this.APIUrl + '/PurchaseOrderLine/update-list', val);
  }
  //Part http methods
  getPartList(): Observable<any[]>{
    return this.http.get<IPart[]>(this.APIUrl + '/Part');
  }
  getPartListNotInPurchaseOrder(val: any){
    return this.http.get<IPart[]>(this.APIUrl + '/Part/'+ val);
  }

  //Supplier http methods
  getSupplierList(): Observable<any[]>{
    return this.http.get<ISupplier[]>(this.APIUrl + '/Supplier');
  }
  addSupplier(val: Supplier){
    return this.http.post<IResultViewModel>(this.APIUrl + '/Supplier',val);
  }

  //StockSite http methods
  getStockSiteList(): Observable<any[]>{
    return this.http.get<IStockSite[]>(this.APIUrl + '/StockSite');
  }

  //Purchase order and purchase order line http methods
  Savechanges2Table(val:any){
    return this.http.post<IResultViewModel>(this.APIUrl + '/PoAndPol',val);
  }

  sendMail(val:any){
    return this.http.post<IResultViewModel>(this.APIUrl + '/Mail',val);
  }
  sendLoginRequest(val:Credential): Observable<any>{
    return this.http.post<IResultViewModel>(this.APIUrl + '/Login', val);
  }
}