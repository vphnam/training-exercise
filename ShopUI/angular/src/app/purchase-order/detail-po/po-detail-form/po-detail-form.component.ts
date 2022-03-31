import { Component, OnInit, Input, ViewChild, Output, AfterViewInit} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    SupplierNo: new FormControl(null),
    SupplierName: new FormControl(null),
    StockSite: new FormControl(null),
    StockName: new FormControl(null),
    OrderDate: new FormControl(null),
    Address: new FormControl(null, [Validators.required]),
    Note: new FormControl(null),
    County: new FormControl(null, [Validators.required]),
    PostCode: new FormControl(null, [Validators.required])
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
      this.poDetailForm.controls['SupplierName'].setValue(this.po.SupplierNoNavigation.SupplierName);
      this.poDetailForm.controls['StockSite'].setValue(this.po.StockSiteNavigation.StockSite1);
    });
  }
}
