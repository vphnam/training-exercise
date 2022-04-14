import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { formatDate } from '@angular/common';
import { ValidatorService } from 'src/app/services/custom-validator/validator.service';
import Swal from 'sweetalert2';
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
  constructor(private service: SharedService, private formBuilder: FormBuilder, private validator: ValidatorService) {}

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
    if(this.polListForm.get('polAdd').valid)
    {
      Swal.fire({title:'Are you sure to add this purchase order line ?',
                  icon:'warning',
                  showDenyButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: "No",}).then((result) => {
                      if(result.isConfirmed)
                      {
                        this.polListForm.get('polAdd').at(0).controls['OrderNo'].setValue(this.no);
                        this.service.addPurchaseOrderLine(e.value).subscribe(data => 
                          {
                              if(data.Status == 200)
                              {
                                Swal.fire({icon: 'success', text: data.Message});
                                this.addLineClick = false;
                                this.refreshPurchaseOrderLineList(this.no);
                                this.RefreshPartList(this.no);
                              }
                              else if(data.Status == 500)
                              {
                                Swal.fire({icon: 'error',title: 'Ooops...', text: data.Message});
                                this.RefreshPartList(this.no);
                              }
                          });
                      }
                      else if(result.isDenied){

                      }
                  });
    }
    else
    { 
      Swal.fire("Please check validation!");
    }
  }

  AddLineBtnClick()
  {
    if(this.polListForm.get('polAdd').length < 1)
    {
      this.partName = this.formBuilder.group({part: ['']});
      this.polListForm.get('polAdd').push(new FormGroup({
            PartNo: new FormControl('',[Validators.required]),
            OrderNo: new FormControl(null),
            PartDescription: new FormControl(null),
            Manufacturer: new FormControl(null),
            OrderDate: new FormControl(null,[Validators.required,this.validator.orderDateValidator]),
            QuantityOrder: new FormControl(null,[Validators.required]),
            BuyPrice: new FormControl(null,[Validators.required]),
            Memo: new FormControl(null),
          }));
    }
    else
      Swal.fire("Already add new po line!");
  }
  UpdateDate(val:any, e: any)
  {
    val.controls['OrderDate'].setValue(e.target.value);
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
    Swal.fire({title:'Are you sure to delete purchase order line ' + e.controls['PartNo'].value + ' ?',
                  icon:'warning',
                  showDenyButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: "No",}).then((result) => {
                      if(result.isConfirmed)
                      {

                        if(this.polListForm.get('pol').length < 2)
                        {
                          Swal.fire({icon: 'error',title: 'Ooops...', text: 'Purchase order must have at least 1 line!'});
                        }
                        else
                        {
                          
                          this.service.deletePurchaseOrderLine(this.DeletePolModel).subscribe(data => 
                            {
                                if(data.Status == 200)
                                {
                                  Swal.fire({icon: 'success', text: data.Message});
                                  this.refreshPurchaseOrderLineList(this.no);
                                  this.RefreshPartList(this.no);
                                }
                                else
                                {
                                  console.warn(JSON.stringify(data));
                                  Swal.fire({icon: 'error',title: 'Ooops...', text: data.Message});
                                }                     
                            }); 
                        }
                      }
                      else if(result.isDenied){

                      }
                });
  }
  refreshPurchaseOrderLineList(val: Number){
    this.service.getRecordsPurchaseLineOrderByOrderNo(val).subscribe((data) => 
    {
      this.polList = data;
      for(let i = 0;i < this.polList.length; i++)
      { 
        this.total += this.polList[i].Amount;
        this.polList[i].OrderDate = formatDate((this.polList[i].OrderDate), "yyyy-MM-ddThh:mm",'en_US');
      }
      this.polListForm = new FormGroup({
        pol:new FormArray([]),
        polAdd:new FormArray([])
      })
      for(let x in this.polList)
      {
        this.polListForm.get('pol').push(new FormGroup({
          PartNo: new FormControl(this.polList[x].PartNo,),
          OrderNo: new FormControl(this.polList[x].OrderNo,),
          PartDescription: new FormControl(this.polList[x].PartDescription,),
          Manufacturer: new FormControl(this.polList[x].Manufacturer,),
          OrderDate: new FormControl(this.polList[x].OrderDate,[Validators.required,this.validator.orderDateValidator]),
          QuantityOrder: new FormControl(this.polList[x].QuantityOrder,[Validators.required]),
          BuyPrice: new FormControl(this.polList[x].BuyPrice,[Validators.required]),
          Memo: new FormControl(this.polList[x].Memo,),  
          Amount: new FormControl(this.polList[x].Amount,)
        }));
      }
      this.disabled = true;
    });
  }
}