import { Component, OnInit, Input} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-po-detail-form',
  templateUrl: './po-detail-form.component.html',
  styleUrls: ['./po-detail-form.component.css']
})
export class PoDetailFormComponent implements OnInit {

  constructor(private service: SharedService) { 
  }

  PurchaseOrder: any=[];
  @Input() orderNo: any;

  ngOnInit(): void {
    this.getPoDetail();
  }

  getPoDetail(){
    this.service.getOneRecordPurchaseOrder(this.orderNo).subscribe(data => {this.PurchaseOrder = data;});
  }
  
}
