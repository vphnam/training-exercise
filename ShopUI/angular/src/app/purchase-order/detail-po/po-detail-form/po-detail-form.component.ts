import { Component, OnInit, Input} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-po-detail-form',
  templateUrl: './po-detail-form.component.html',
  styleUrls: ['./po-detail-form.component.css']
})
export class PoDetailFormComponent implements OnInit {

  @Input() no: any;
  constructor(private service: SharedService) { 
  }

  po : any = [];
  ngOnInit(): void {
    this.getPoDetail(this.no);
  } 

  getPoDetail(val: Number){
    this.service.getOneRecordPurchaseOrderByOrderNo(val).subscribe(data => {this.po = data;});
  }
}
