import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Pipe, PipeTransform } from '@angular/core';
import { PolListComponent } from '../purchase-order/detail-po/pol-list/pol-list.component';
import { Po } from '../services/interface.service';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(PoList: any[], orderNoSearch: string, supplierNameSearch: string, stockSiteSearch: string, 
    stockNameSearch: string, orderDateSearch: Date, sentMailSearch: boolean): Po[] {
    if(!PoList || (!orderNoSearch && !supplierNameSearch && !stockSiteSearch && !stockNameSearch && !orderDateSearch && !sentMailSearch))
    {
      return PoList;
    }
    if(orderNoSearch != '' && orderNoSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.OrderNo == Number(orderNoSearch),);
    }
    if(supplierNameSearch != '' && supplierNameSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.SupplierNoNavigation.SupplierName.toLocaleLowerCase().includes(supplierNameSearch.toLocaleLowerCase()));
    }
    if(stockSiteSearch != '' && stockSiteSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.StockSiteNavigation.StockSite1.toLocaleLowerCase().includes(stockSiteSearch.toLocaleLowerCase()));
    }
    if(stockNameSearch != '' && stockNameSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.StockName.toLocaleLowerCase().includes(stockNameSearch.toLocaleLowerCase()));
    }
    if(orderDateSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.OrderDate.includes(orderDateSearch));
    }
    if(sentMailSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.SentMail == sentMailSearch,);
    }
      return PoList;
  }
  

}
