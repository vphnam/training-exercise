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
  supplierNo: number,
  supplierName: string,
  email: string
}
export interface StockSite{
  stockSite1: string,
  email: string
}
export interface Po{
  orderNo: number;
  supplierNoNavigation: Supplier,
  stockSiteNavigation:StockSite,
  stockName: string,
  orderDate: Date,
  note: string,
  address: string,
  county: string,
  postCode: string,
  sentMail: boolean,
  status: boolean,
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
export interface Credential{
  UserName: string;
  PassWord: string;
}
export interface ErrorPageModel{
  header: string;
  errorStatus:number;
  message: string;
}