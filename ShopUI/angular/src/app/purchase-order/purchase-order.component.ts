import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
