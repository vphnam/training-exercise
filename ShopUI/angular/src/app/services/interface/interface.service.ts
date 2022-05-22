import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  constructor() { }
}
export interface IPol{
  partNo: number,
  orderNo: number,
  partDescription: string,
  manufacturer: string,
  quantityOrder: number,
  buyPrice:number,
  orderDate: string,
  meMo: string,
  amount: Number
}
export interface ISupplier{
  supplierNo: number,
  supplierName: string,
  email: string
}
export interface IStockSite{
  stockSite1: string,
  email: string
}
export interface IPoShow{
  orderNo: number,
  supplierName: string,
  stockName: string,
  stockSite1: string,
  orderDate: Date,
  sentMail: boolean,
  status: boolean,
}
export interface IPo{
  orderNo: number,
  supplierNoNavigation: ISupplier,
  stockSiteNavigation:IStockSite,
  stockName: string,
  orderDate: Date,
  note: string,
  address: string,
  county: string,
  postCode: string,
  sentMail: boolean,
  status: boolean,
  polList: IPol[]
}
export interface IPart{
  partNo: string,
  partName: string
}
export interface IResultViewModel{
  status: number;
  message: string;
  data: any
}
export interface ICredential{
  UserName: string;
  PassWord: string;
}
export interface IErrorPageModel{
  header: string;
  errorStatus:number;
  message: string;
}