import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pol-list',
  templateUrl: './pol-list.component.html',
  styleUrls: ['./pol-list.component.css']
})
export class PolListComponent implements OnInit{

  //parameter from parert
  @Input() no: any;
  @Input() disableAll!: boolean;
  //
  disabled!: boolean;
  addLineClick = false;
  parts: any;
  partName!: FormGroup;

  //
  polList: any = [];
  polToAdd: any = {};
  DeletePolModel: any = {};
  total: Number = 0;
  //
  polListForm: any;
  //
  pol:any;
  //
  constructor(private service: SharedService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.refreshPurchaseOrderLineList(this.no);
    this.RefreshPartList(this.no);
  }
  RefreshPartList(val:any)
  {
    this.service.getPartListNotInPurchaseOrder(val).subscribe((data) => 
    {
      this.parts = data;
    });
  }
  orderDateValidator(d: FormControl){
    try
    {
      var today = new Date();
      const date = formatDate(today, "MM-dd-yyyy HH:mm:ss",'en_US');
      const od = formatDate(d.value, "MM-dd-yyyy HH:mm:ss",'en_US');
      if(date < od){
        return {orderDateValidator: {invalid:true}};
      }
      else
      {
        return null;
      }
    }
    catch
    {
      return {orderDateValidator: {invalid:true}};
    }
  }
  disableForm()
  {
    for(let i = 0; i < this.polListForm.get('pol').length;i++)
    {
      this.polListForm.get('pol').at(i).disable();  
    }
    this.polListForm.get('polAdd').disable();
  }

  btnAddClick(e: any)
  {
    if(this.polListForm.valid)
    {
      this.polListForm.get('polAdd').at(0).controls['OrderNo'].setValue(this.no);
      this.service.addPurchaseOrderLine(e.value).subscribe(data => 
        {
          alert(data.toString());
          this.addLineClick = false;
          this.refreshPurchaseOrderLineList(this.no);
          this.RefreshPartList(this.no);
        });
    }
    else
    {
      alert("Please check validation!");
    }
  }

  AddLineBtnClick()
  {
    if(this.polListForm.get('polAdd').valid)
    {
      this.partName = this.formBuilder.group({part: ['']});
      this.polListForm.get('polAdd').push(new FormGroup({
            PartNo: new FormControl('',[Validators.required]),
            OrderNo: new FormControl(null,[Validators.required]),
            PartDescription: new FormControl(null,[Validators.required]),
            Manufacturer: new FormControl(null,[Validators.required]),
            OrderDate: new FormControl(null,[Validators.required,this.orderDateValidator]),
            QuantityOrder: new FormControl(null,[Validators.required]),
            BuyPrice: new FormControl(null,[Validators.required]),
            Memo: new FormControl(null,[Validators.required]),
            Amount: new FormControl({value:null, disabled:true}),
          }));
    }
    else
      alert("Already add new po line!");
  }
  onChangeQtyAndPrice(val: any,e: any, i: number)
  {
    e.controls['Amount'].setValue(e.controls['QuantityOrder'].value * e.controls['BuyPrice'].value);
    this.total = 0;
    for(let i = 0; i < val.value.length; i++)
    {
      this.total += val.at(i).value.Amount;
    }
  }
  btnDeleteClick(e:any)
  {
    this.DeletePolModel.PartNo = e.controls['PartNo'].value;
    this.DeletePolModel.OrderNo = e.controls['OrderNo'].value
    if(confirm('Are you sure to delete part no ' + e.controls['PartNo'].value + ' ?'))
    {
      this.service.deletePurchaseOrderLine(this.DeletePolModel).subscribe(data => 
      {
        alert(data.toString());
        this.refreshPurchaseOrderLineList(this.no);
        this.RefreshPartList(this.no);
      }); 
    }
  }
  refreshPurchaseOrderLineList(val: Number){
    this.service.getRecordsPurchaseLineOrderByOrderNo(val).subscribe((data) => 
    {
      this.polList = data;
      for(let i = 0;i < this.polList.length; i++)
      { 
        this.total += this.polList[i].Amount;
        this.polList[i].OrderDate = formatDate((this.polList[i].OrderDate), "MM-dd-yyyy HH:mm:ss",'en_US');
      }
      this.polListForm = new FormGroup({
        pol:new FormArray([]),
        polAdd:new FormArray([])
      })
      for(let x in this.polList)
      {
        this.polListForm.get('pol').push(new FormGroup({
          PartNo: new FormControl(this.polList[x].PartNo,),
          OrderNo: new FormControl(this.polList[x].OrderNo,[Validators.required]),
          PartDescription: new FormControl(this.polList[x].PartDescription,[Validators.required]),
          Manufacturer: new FormControl(this.polList[x].Manufacturer,[Validators.required]),
          OrderDate: new FormControl(this.polList[x].OrderDate,[Validators.required,this.orderDateValidator]),
          QuantityOrder: new FormControl(this.polList[x].QuantityOrder,[Validators.required]),
          BuyPrice: new FormControl(this.polList[x].BuyPrice,[Validators.required]),
          Memo: new FormControl(this.polList[x].Memo,[Validators.required]),  
          Amount: new FormControl(this.polList[x].Amount,)
        }));
      }
      this.disabled = true;
    });
  }
}