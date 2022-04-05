import { Component, OnInit} from '@angular/core';
import {SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Po } from 'src/app/services/interface.service';

@Component({
  selector: 'app-show-po',
  templateUrl: './show-po.component.html',
  styleUrls: ['./show-po.component.css'],
})
export class ShowPoComponent implements OnInit {
  constructor(private service: SharedService, private route: ActivatedRoute) { 
  }
  //search attributes
  orderNoSearch!: string;
  supplierNameSearch!: string;
  stockSiteSearch!: string;
  stockNameSearch!: string;
  orderDateSearch!: Date;
  sentMailSearch!: boolean;
  //pagination
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [5, 10, 20, 50,100];
  //
  poList!: Po[];
  poSearch: any =[];
  //poListForm: any;
  ngOnInit(): void {
    this.refreshPurchaseOrderList();
  }
  openDialog(){
  }
  refreshPurchaseOrderList(){
    this.service.getPurchaseOrderList().subscribe(data => {
      this.poList = data;
    });
  }
  onTableDataChange(event: any){
    this.page = event;
    this.refreshPurchaseOrderList();
  }
  onTableSizeChange(event: any){
    this.tableSize = event.target.value;
    this.page = 1;
    this.refreshPurchaseOrderList();
  }
}