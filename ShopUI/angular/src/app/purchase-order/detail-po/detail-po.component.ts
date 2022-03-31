import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { PoDetailFormComponent } from './po-detail-form/po-detail-form.component';
import { PolListComponent } from './pol-list/pol-list.component';
@Component({
  selector: 'app-detail-po',
  templateUrl: './detail-po.component.html',
  styleUrls: ['./detail-po.component.css']
})
export class DetailPoComponent implements OnInit{

  //pass order no to child
  disableAllToChildComponent: boolean = false;
  orderNoToChildComponent: any;

  //get data from child
  poToSaveChanges: any = [];
  poToCancel: any = [];
  po: any;
  @ViewChildren(PoDetailFormComponent, {read: PoDetailFormComponent})private detailChild! : QueryList<PoDetailFormComponent>;
  @ViewChildren(PolListComponent, {read: PolListComponent})private polListChild! : QueryList<PolListComponent>;
  constructor(private route:ActivatedRoute, private service:SharedService) {}
  DisableAll()
  {
    this.disableAllToChildComponent = true;
    this.detailChild.first.disableForm();
  }
  saveChangesBtnClick()
  {
    if(this.detailChild.first.poDetailForm.valid)
    {
      this.poToSaveChanges = this.detailChild.first.po;
      this.poToSaveChanges.StockName = this.detailChild.first.poDetailForm.controls['StockName'].value;
      this.poToSaveChanges.Note = this.detailChild.first.poDetailForm.controls['StockName'].value;
      this.poToSaveChanges.County = this.detailChild.first.poDetailForm.controls['County'].value;
      this.poToSaveChanges.PostCode = this.detailChild.first.poDetailForm.controls['PostCode'].value;
      this.poToSaveChanges.polList= (this.polListChild.first.polList);
      if(confirm('Are you sure to save these changes ?'))
      {
        this.service.Savechanges2Table(this.poToSaveChanges).subscribe(data => 
        {
          alert(data.toString());
        }); 
      }
    }
  } 
  cancelPoBtnClick()
  {
    if(confirm('Are you sure to cancel purchase order ' + this.orderNoToChildComponent + ' ?'))
    {
      this.detailChild.first.po.Status = false;
      this.service.updatePurchaseOrder(this.detailChild.first.po).subscribe(data => 
        {
          this.service.setQtyAndPriceOfAllGivenPolToZero(this.polListChild.first.polList).subscribe(data =>{
            this.polListChild.first.refreshPurchaseOrderLineList(this.orderNoToChildComponent);
            this.DisableAll();
          });
        });  
    }
  } 
  ngOnInit(): void {
    this.route.params.subscribe(params => {this.orderNoToChildComponent = params['no'], this.disableAllToChildComponent = params['disableAll']});
    this.checkPoStatus(this.orderNoToChildComponent);
  }
  checkPoStatus(val: Number){
    this.service.getOneRecordPurchaseOrderByOrderNo(val).subscribe(data => 
      {
        this.po = data;
        if(this.po.Status == false)
        {
          this.DisableAll();
        }
      });
  }
}