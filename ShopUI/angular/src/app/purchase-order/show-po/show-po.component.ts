import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/purchase-order/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-show-po',
  templateUrl: './show-po.component.html',
  styleUrls: ['./show-po.component.css']
})
export class ShowPoComponent implements OnInit {

  constructor(private service: SharedService, private route: ActivatedRoute) { 
  }
  poList: any=[];
  poListForm: any;
  ngOnInit(): void {
    this.refreshPurchaseOrderList();
  }

  refreshPurchaseOrderList(){
    this.service.getPurchaseOrderList().subscribe(data => {
      this.poList = data;
      console.warn(this.poList);
      this.poListForm = new FormGroup({
        po:new FormArray([]),
      })
      for(let x in this.poList)
      {
        this.poListForm.get('po').push(new FormGroup({
          PartNo: new FormControl(this.poList[x].PartNo,),
          OrderNo: new FormControl(this.poListForm[x].OrderNo,[Validators.required]),
          PartDescription: new FormControl(this.poListForm[x].PartDescription,[Validators.required]),
          Manufacturer: new FormControl(this.poListForm[x].Manufacturer,[Validators.required]),
          OrderDate: new FormControl(this.poListForm[x].OrderDate,[Validators.required]),
          QuantityOrder: new FormControl(this.poListForm[x].QuantityOrder,[Validators.required]),
          BuyPrice: new FormControl(this.poListForm[x].BuyPrice,[Validators.required]),
          Memo: new FormControl(this.poListForm[x].Memo,[Validators.required]),  
          Amount: new FormControl(this.poListForm[x].Amount,)
        }));
      }
    });
  }
}
