import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor() { }
}
export interface Pol{
  PartNo: number,
  OrderNo: number,
  PartDescription: string,
  Manufacturer: string,
  QuantityOrder: number,
  BuyPrice:number,
  OrderDate: string,
  MeMo: string,
  Amount: Number
}
export interface Supplier{
  SupplierNo: number,
  SupplierName: string,
  Email: string
}
export interface StockSite{
  StockSite1: string,
  Email: string
}
export interface Po{
  OrderNo: number;
  SupplierNoNavigation: Supplier,
  StockSiteNavigation:StockSite,
  StockName: string,
  OrderDate: Date,
  Note: string,
  Address: string,
  County: string,
  PostCode: string,
  SentMail: boolean,
  Status: boolean,
  polList: Pol[]
}
export interface Part{
  PartNo: string,
  PartName: string
}
export interface ResultViewModel{
  Status: number;
  Message: string;
  Data: any
}