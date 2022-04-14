import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Pipe, PipeTransform } from '@angular/core';
import { PolListComponent } from '../purchase-order/detail-po/pol-list/pol-list.component';
import { Po } from '../services/interface/interface.service';

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
      value.orderNo == Number(orderNoSearch));
    }
    if(supplierNameSearch != '' && supplierNameSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.supplierNoNavigation.supplierName.toLocaleLowerCase().includes(supplierNameSearch.toLocaleLowerCase()));
    }
    if(stockSiteSearch != '' && stockSiteSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.stockSiteNavigation.stockSite1.toLocaleLowerCase().includes(stockSiteSearch.toLocaleLowerCase()));
    }
    if(stockNameSearch != '' && stockNameSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.stockName.toLocaleLowerCase().includes(stockNameSearch.toLocaleLowerCase()));
    }
    if(orderDateSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.orderDate.includes(orderDateSearch));
    }
    if(sentMailSearch != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.sentMail == sentMailSearch,);
    }
      return PoList;
  }
  /*transform(PoList: any[],val: any): Po[] {
    if(!PoList || (!val.controls['orderNoSearch'].value && !val.controls['supplierNameSearch'].value && !val.controls['stockSiteSearch'].value 
    && !val.controls['stockNameSearch'].value && !val.controls['orderDateSearch'].value && !val.controls['sentMailSearch'].value))
    {
      return PoList;
    }
    if(val.controls['orderNoSearch'].value != '' && val.controls['orderNoSearch'].value != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.OrderNo == Number(val.controls['orderNoSearch'].value),);
    }
    if(val.controls['supplierNameSearch'].value != '' && val.controls['supplierNameSearch'].value != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.supplierNoNavigation.supplierName.toLocaleLowerCase().includes(val.controls['supplierNameSearch'].value.toLocaleLowerCase()));
    }
    if(val.controls['stockSiteSearch'].value != '' && val.controls['stockSiteSearch'].value != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.stockSiteNavigation.stockSite1.toLocaleLowerCase().includes(val.controls['stockSiteSearch'].value.toLocaleLowerCase()));
    }
    if(val.controls['stockNameSearch'].value != '' && val.controls['stockNameSearch'].value != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.stockName.toLocaleLowerCase().includes(val.controls['stockNameSearch'].value.toLocaleLowerCase()));
    }
    if(val.controls['orderDateSearch'].value != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.orderDate.includes(val.controls['orderDateSearch'].value));
    }
    if(val.controls['sentMailSearch'].value != undefined)
    {
      PoList = PoList.filter((value: any) => 
      value.sentMail == val.controls['sentMailSearch'].value,);
    }
      return PoList;
  }*/

}
