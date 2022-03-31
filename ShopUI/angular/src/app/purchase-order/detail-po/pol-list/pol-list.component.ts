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

  @Input() no: any;
  @Input() disableAll!: boolean;
  addLineClick = false;
  parts: any;
  partName!: FormGroup;

  //
  polList: any = [];
  polToAdd: any = {};
  DeletePolModel: any = {};
  total: Number = 0;
  //
  partNo? = new FormControl();
  polListForm: any;
  //
  pol:any;
  //
  constructor(private service: SharedService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.polListForm = new FormGroup({
      pol:new FormArray([])
    })
    this.refreshPurchaseOrderLineList(this.no);
    this.partName = this.formBuilder.group({part: ['']});
    this.RefreshPartList(this.no);
  }
  changePartNo(e:any)
  {
    this.partNo = e.target.value;
  }

  RefreshPartList(val:any)
  {
    this.service.getPartListNotInPurchaseOrder(val).subscribe((data) => 
    {
      this.parts = data;
    });
  }
  btnAddClick(des: string, manu: string, orderDate: string, qty: any, price: any, memo: string)
  {
    this.polToAdd.partNo = this.partNo;
    this.polToAdd.orderNo = this.no;
    this.polToAdd.partDescription = des;
    this.polToAdd.Manufacturer = manu;
    this.polToAdd.orderDate = formatDate(orderDate, "yyyy-MM-ddTHH:mm:ss",'en_US');
    this.polToAdd.QuantityOrder = qty;
    this.polToAdd.BuyPrice = price;
    this.polToAdd.OrderDate = Date.now.toString;
    this.polToAdd.MeMo = memo;
    this.service.addPurchaseOrderLine(this.polToAdd).subscribe(data => 
      {
        alert(data.toString());
        this.addLineClick = false;
        this.refreshPurchaseOrderLineList(this.no);
        this.RefreshPartList(this.no);
      });   
  }

  AddLineBtnClick()
  {
    this.addLineClick = true;
  }
  btnDeleteClick(PartNo: Number, OrderNo: Number)
  {
    this.DeletePolModel.partNo = PartNo;
    this.DeletePolModel.orderNo = OrderNo;
    if(confirm('Are you sure to delete part no ' + PartNo + ' ?'))
    {
      this.service.deletePurchaseOrderLine(this.DeletePolModel).subscribe(data => 
      {
        alert(data.toString());
        this.refreshPurchaseOrderLineList(this.no);
        this.RefreshPartList(this.no);
      }); 
    }
  }
  UpdateTotal(PolList: any,Pol: any)
  {
    if(Pol.QuantityOrder < 1)
      Pol.QuantityOrder = 1   
    else if(Pol.BuyPrice < 1)
        Pol.BuyPrice = 1
    console.log(PolList);
    console.log(Pol);
    Pol.Amount = Pol.QuantityOrder * Pol.BuyPrice;
    this.total = 0;
    for(let i = 0; i <= PolList.length; i++)
    {
      this.total += PolList[i].Amount;
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
      for(let x in this.polList)
      {
        this.polListForm.get('pol').push(new FormGroup({
          PartNo: new FormControl({value: this.polList[x].PartNo, disabled:true}),
          OrderNo: new FormControl(this.polList[x].OrderNo,[Validators.required]),
          PartDescription: new FormControl(this.polList[x].PartDescription,[Validators.required]),
          Manufacturer: new FormControl(this.polList[x].Manufacturer,[Validators.required]),
          OrderDate: new FormControl(this.polList[x].OrderDate,[Validators.required]),
          QuantityOrder: new FormControl(this.polList[x].QuantityOrder,[Validators.required]),
          BuyPrice: new FormControl(this.polList[x].BuyPrice,[Validators.required]),
          Memo: new FormControl(this.polList[x].Memo,[Validators.required]),
          Amount: new FormControl(this.polList[x].Amount,[Validators.required]),
        }));
      }
      console.log("haha: " + JSON.stringify(this.polListForm.value));
    });
  }
}