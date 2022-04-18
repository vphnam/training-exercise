import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPo, IStockSite, ISupplier } from 'src/app/services/interface/interface.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/services/custom-validator/validator.service';

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrls: ['./add-po.component.css']
})
export class AddPoComponent implements OnInit, OnDestroy {

  constructor(private service: SharedService, 
    private router: Router, 
    private validate: ValidatorService) 
    { 
      this.poAddForm = new FormGroup({
        supplierNo: new FormControl(null, [Validators.required]),
        stockSite: new FormControl(null, [Validators.required]),
        stockName: new FormControl(null, [Validators.required]),
        orderDate: new FormControl(null, [Validators.required, this.validate.orderDateValidator]),
        address: new FormControl(null, [Validators.required]),
        note: new FormControl(null,),
        county: new FormControl(null, [Validators.required]),
        postCode: new FormControl(null, [Validators.required])
      });

      this.RefreshSupplierList();
      this.RefreshStockSiteList();
    }
  ngOnDestroy(): void {
  }

  poAddForm: any;
  //
  suppliers!: ISupplier[];
  stockSites!: IStockSite[];
  //
  @Output() hidModal: EventEmitter<string> = new EventEmitter<string>();

  //
  ngOnInit(): void {
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
                              if(data.status == 200)
                              {
                                this.hidModal.emit();
                                Swal.fire({icon: 'success', text: data.message});
                                this.router.navigateByUrl('/purchase-order/detail-po/' + data.data.orderNo);
                              }
                              else if(data.status == 500)
                              {
                                Swal.fire({icon: 'error',title: 'Ooops...', text: data.message});
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
