import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RaiseAlertService {

  constructor() { }
  raiseAlert(icon: any, title: string,mess: string)
  {
    Swal.fire({icon: icon,title: title, text: mess});
  }
}
