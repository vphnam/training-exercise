import { Component, OnInit, Input, ViewChild, Output, AfterViewInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { formatDate } from '@angular/common';
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
  //
  poDetailForm = new FormGroup({
    supplierNo: new FormControl(null),
    supplierName: new FormControl(null),
    stockSite: new FormControl(null),
    stockName: new FormControl(null),
    orderDate: new FormControl(null),
    address: new FormControl(null, [Validators.required]),
    note: new FormControl(null),
    county: new FormControl(null, [Validators.required]),
    postCode: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.getPoDetail(this.no);
  } 
  disableForm()
  {
    this.poDetailForm.disable();
  }
  getPoDetail(val: Number){
    this.service.getOneRecordPurchaseOrderByOrderNo(val).subscribe(data => 
    {
      this.po = data;
      this.poDetailForm.patchValue(data);
      this.poDetailForm.controls['supplierName'].setValue(this.po.supplierNoNavigation.supplierName);
      this.poDetailForm.controls['stockSite'].setValue(this.po.stockSiteNavigation.stockSite1);
      this.poDetailForm.controls['orderDate'].setValue(formatDate((this.po.orderDate), "MM-dd-yyyy",'en_US'));
    });
  }
}
