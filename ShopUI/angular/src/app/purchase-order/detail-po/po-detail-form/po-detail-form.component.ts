import { Component, OnInit, Input, ViewChild, Output} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { DetailPoComponent } from '../detail-po.component';
@Component({
  selector: 'app-po-detail-form',
  templateUrl: './po-detail-form.component.html',
  styleUrls: ['./po-detail-form.component.css']
})
export class PoDetailFormComponent implements OnInit {

  @Input() no: any;
  @Input() disableAll!: boolean;
  constructor(private service: SharedService) { 
  }
  //
  public supplierNo: number = 1;
  public po : any;

  ngOnInit(): void {
    this.getPoDetail(this.no);
  } 

  getPoDetail(val: Number){
    this.service.getOneRecordPurchaseOrderByOrderNo(val).subscribe(data => {this.po = data;});
  }
}
