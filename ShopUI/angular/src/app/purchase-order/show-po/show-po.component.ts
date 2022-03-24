import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-show-po',
  templateUrl: './show-po.component.html',
  styleUrls: ['./show-po.component.css']
})
export class ShowPoComponent implements OnInit {

  constructor(private service: SharedService, private route: ActivatedRoute) { 
  }
  PurchaseOrderList: any=[];

  ngOnInit(): void {
    this.refreshPurchaseOrderList();
  }

  refreshPurchaseOrderList(){
    this.service.getPurchaseOrderList().subscribe(data => {this.PurchaseOrderList = data;});
  }
}
