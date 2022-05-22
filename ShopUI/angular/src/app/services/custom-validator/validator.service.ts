import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
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
