import { Pipe, PipeTransform } from '@angular/core';
import { ISupplier } from '../services/interface/interface.service';

@Pipe({
  name: 'searchByNoFilter'
})
export class SearchByNoFilterPipe implements PipeTransform {

  transform(List: any[], orderNoSearch: string): any[] {
    if(!List || (!orderNoSearch))
    {
      return List;
    }
    if(orderNoSearch != '' && orderNoSearch != undefined)
    {
      List = List.filter((value: any) => 
      value.orderNo == Number(orderNoSearch));
    }
      return List;
  }

}
