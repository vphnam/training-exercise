import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Po, StockSite, Supplier } from 'src/app/services/interface/interface.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/services/custom-validator/validator.service';

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrls: ['./add-po.component.css']
})
export class AddPoComponent implements OnInit {

  constructor(private service: SharedService, private router: Router, private validate: ValidatorService) { }

  poAddForm = new FormGroup({
    SupplierNo: new FormControl(null, [Validators.required]),
    StockSite: new FormControl(null, [Validators.required]),
    StockName: new FormControl(null, [Validators.required]),
    OrderDate: new FormControl(null, [Validators.required, this.validate.orderDateValidator]),
    Address: new FormControl(null, [Validators.required]),
    Note: new FormControl(null,),
    County: new FormControl(null, [Validators.required]),
    PostCode: new FormControl(null, [Validators.required])
  });
  //
  suppliers!: Supplier[];
  stockSites!: StockSite[];
  //
  @Output() hidModal: EventEmitter<string> = new EventEmitter<string>();

  //
  ngOnInit(): void {
    this.RefreshSupplierList();
    this.RefreshStockSiteList();
  }
  addPoBtnClick()
  {
    if(this.poAddForm.valid)
    {
      Swal.fire({title:'Are you sure to add this purchase order ?',
                  icon:'warning',
                  showDenyButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: "No",}).then((result) => {
                      if(result.isConfirmed)
                      {
                        this.service.addPurchaseOrder(this.poAddForm.value).subscribe(data => 
                          {
                              if(data.Status == 200)
                              {
                                this.hidModal.emit();
                                Swal.fire({icon: 'success', text: data.Message});
                                this.router.navigateByUrl('/purchase-order/detail-po/' + data.Data.OrderNo);
                              }
                              else if(data.Status == 500)
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
  RefreshAddPoForm()
  {
    this.poAddForm.reset();
  }
  RefreshSupplierList()
  {
    this.service.getSupplierList().subscribe((data) => 
    {
      this.suppliers = data;
    });
  }
  RefreshStockSiteList()
  {
    this.service.getStockSiteList().subscribe((data) => 
    {
      this.stockSites = data;
    });
  }
}
