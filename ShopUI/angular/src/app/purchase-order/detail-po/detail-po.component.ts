import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { PoDetailFormComponent } from './po-detail-form/po-detail-form.component';
import { PolListComponent } from './pol-list/pol-list.component';
@Component({
  selector: 'app-detail-po',
  templateUrl: './detail-po.component.html',
  styleUrls: ['./detail-po.component.css']
})
export class DetailPoComponent implements OnInit, AfterViewInit{

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
  ngAfterViewInit(): void {
    this.checkPoStatus(this.orderNoToChildComponent);    
  }
  DisableAll()
  {
    this.disableAllToChildComponent = true;
    this.detailChild.first.disableForm();
    this.polListChild.first.disableForm();
  }
  saveChangesBtnClick()
  {
    if(this.detailChild.first.poDetailForm.valid && this.polListChild.first.polListForm.valid)
    {
      this.poToSaveChanges = this.detailChild.first.po;
      this.poToSaveChanges.StockName = this.detailChild.first.poDetailForm.controls['StockName'].value;
      this.poToSaveChanges.Note = this.detailChild.first.poDetailForm.controls['StockName'].value;
      this.poToSaveChanges.Address = this.detailChild.first.poDetailForm.controls['Address'].value;
      this.poToSaveChanges.County = this.detailChild.first.poDetailForm.controls['County'].value;
      this.poToSaveChanges.PostCode = this.detailChild.first.poDetailForm.controls['PostCode'].value;
      this.poToSaveChanges.polList= (this.polListChild.first.polListForm.get('pol').value);
      Swal.fire({title:'Are you sure to save these changes ?',
                  icon:'warning',
                  showDenyButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: "No",}).then((result) => {
                      if(result.isConfirmed)
                      {
                        this.service.Savechanges2Table(this.poToSaveChanges).subscribe(data => 
                          {
                            if(data.Status == 200)
                              {
                                Swal.fire({icon: 'success', text: data.Message});
                              }
                              else
                              {
                                Swal.fire({icon: 'error',title: 'Ooops...', text: data.Message});
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
  cancelPoBtnClick()
  {
    Swal.fire({title:'Are you sure to cancel purchase order ' + this.orderNoToChildComponent + ' ?',
                  icon:'warning',
                  showDenyButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: "No",}).then((result) => {
                      if(result.isConfirmed)
                      {
                        this.detailChild.first.po.Status = false;
                        this.service.updatePurchaseOrder(this.detailChild.first.po).subscribe(data => 
                          {
                            this.service.setQtyAndPriceOfAllGivenPolToZero(this.polListChild.first.polList).subscribe(data =>{
                              if(data.Status == 200)
                              {
                                Swal.fire({icon: 'success', text: data.Message});
                                this.DisableAll();
                              }
                              else
                              {
                                Swal.fire({icon: 'error',title: 'Ooops...', text: data.Message});
                              }
                            });
                          });  
                      }
                      else if(result.isDenied){
                      }
                  });
  } 
  ngOnInit(): void {
    this.route.params.subscribe(params => {this.orderNoToChildComponent = params['no'], 
    this.disableAllToChildComponent = params['disableAll']});
  }
  checkPoStatus(val: Number){
    this.service.getOneRecordPurchaseOrderByOrderNo(val).subscribe(data => 
      {
        this.po = data;
        if(this.po.Status == false)
        {
          this.DisableAll();
          Swal.fire("This purchase order has been cancelled!");
        }
      });
  }
}