import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css']
})
export class PoListComponent implements OnInit {
  @Input() no!:number;
  po: any;
  constructor(private service: SharedService) { }

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
