import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pol-list',
  templateUrl: './pol-list.component.html',
  styleUrls: ['./pol-list.component.css']
})
export class PolListComponent implements OnInit, AfterViewInit {
  selectedRow: any;
  @Input() no: any;
  constructor(private service: SharedService) { 
  }
  ngAfterViewInit(): void {
    console.log("haha: " + this.polList.length);  
  }

  polList: any=[];
  total: number = 0;
  ngOnInit(): void {
    this.refreshPurchaseOrderLineList(this.no);
  }

  btnDeleteClick(item: Number)
  {
    if(confirm('Are you sure to delete part no ' + item + ' ?'))
    {
      this.service.deletePurchaseOrderLine(item).subscribe(data => 
      {
        alert(data.toString());
        this.refreshPurchaseOrderLineList(this.no);
      }); 
    }
  }

  UpdateTotal(PolList: any,Pol: any)
  {
      Pol.Amount = Pol.QuantityOrder * Pol.BuyPrice;
      this.total = 0;
      for(let i = 0; i <= PolList.length; i++)
      {
        this.total += PolList[i].Amount;
      }
  }

  refreshPurchaseOrderLineList(val: Number){
    this.service.getRecordsPurchaseLineOrderByOrderNo(val).subscribe(data => {this.polList = data});
  }
} 
