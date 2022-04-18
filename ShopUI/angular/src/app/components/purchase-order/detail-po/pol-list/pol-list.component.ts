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

  constructor(private service: SharedService, 
    private formBuilder: FormBuilder, 
    private validator: ValidatorService) 
    {
      this.polListForm = new FormGroup({
        pol:new FormArray([]),
        polAdd:new FormArray([])
      })
    }

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
                        this.polListForm.get('polAdd').at(0).controls['orderNo'].setValue(this.no);
                        this.service.addPurchaseOrderLine(e.value).subscribe(data => 
                          {
                              if(data.status == 200)
                              {
                                Swal.fire({icon: 'success', text: data.message});
                                this.polListForm.get('polAdd').removeAt(0);
                                this.refreshPurchaseOrderLineList(this.no);
                                this.RefreshPartList(this.no);
                              }
                              else if(data.status == 500)
                              {
                                Swal.fire({icon: 'error',title: 'Ooops...', text: data.message});
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
            partNo: new FormControl('',[Validators.required]),
            orderNo: new FormControl(null),
            partDescription: new FormControl(null),
            manufacturer: new FormControl(null),
            orderDate: new FormControl(null,[Validators.required,this.validator.orderDateValidator]),
            quantityOrder: new FormControl(null,[Validators.required]),
            buyPrice: new FormControl(null,[Validators.required]),
            memo: new FormControl(null),
            amount: new FormControl(null),
          }));
    }
    else
      Swal.fire("Already add new po line!");
  }
  UpdateDate(val:any, e: any)
  {
    val.controls['orderDate'].setValue(e.target.value);
  }
  onChangeQtyAndPrice(val: any,e: any, i: number)
  {
    e.controls['amount'].setValue(e.controls['quantityOrder'].value * e.controls['buyPrice'].value);
    this.total = 0;
    for(let i = 0; i < val.value.length; i++)
    {
      this.total += val.at(i).value.amount;
    }
  }
  btnDeleteClick(e:any)
  {
    this.DeletePolModel.PartNo = e.controls['partNo'].value;
    this.DeletePolModel.OrderNo = e.controls['orderNo'].value
    Swal.fire({title:'Are you sure to delete purchase order line ' + e.controls['partNo'].value + ' ?',
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
                                if(data.status == 200)
                                {
                                  Swal.fire({icon: 'success', text: data.message});
                                  this.refreshPurchaseOrderLineList(this.no);
                                  this.RefreshPartList(this.no);
                                }
                                else
                                {
                                  console.warn(JSON.stringify(data));
                                  Swal.fire({icon: 'error',title: 'Ooops...', text: data.message});
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
        this.total += this.polList[i].amount;
        this.polList[i].orderDate = formatDate((this.polList[i].orderDate), "yyyy-MM-ddThh:mm",'en_US');
      }
      this.polListForm = new FormGroup({
        pol:new FormArray([]),
        polAdd:new FormArray([])
      })
      for(let x in this.polList)
      {
        this.polListForm.get('pol').push(new FormGroup({
          partNo: new FormControl(this.polList[x].partNo,),
          orderNo: new FormControl(this.polList[x].orderNo,),
          partDescription: new FormControl(this.polList[x].partDescription,),
          manufacturer: new FormControl(this.polList[x].manufacturer,),
          orderDate: new FormControl(this.polList[x].orderDate,[Validators.required,this.validator.orderDateValidator]),
          quantityOrder: new FormControl(this.polList[x].quantityOrder,[Validators.required]),
          buyPrice: new FormControl(this.polList[x].buyPrice,[Validators.required]),
          memo: new FormControl(this.polList[x].memo,),  
          amount: new FormControl(this.polList[x].amount,)
        }));
      }
      this.disabled = true;
    });
  }
}