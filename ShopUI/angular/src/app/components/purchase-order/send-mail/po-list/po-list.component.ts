import { Component, OnInit, Input } from '@angular/core';
import { Po } from 'src/app/models/po';
import { IPo } from 'src/app/services/interface/interface.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css']
})
export class PoListComponent implements OnInit {
  @Input() no!:number;
  po!: IPo;
  constructor(private service: SharedService) {
    this.po = new Po;
   }

  ngOnInit(): void {
    this.refreshPoList(this.no);
  } 
  refreshPoList(no: number)
  {
    this.service.getOneRecordPurchaseOrderByOrderNo(no).subscribe(data => 
      {
        this.po = data;
      });
  }
}
