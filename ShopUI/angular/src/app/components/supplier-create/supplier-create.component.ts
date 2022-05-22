import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { RaiseAlertService } from 'src/app/services/raise-alert/raise-alert.service';
@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  constructor(private shared: SharedService, private raiseAlert: RaiseAlertService) { }

  addSupplierFormGroup = new FormGroup({
    supplierName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required,Validators.email])
  });
  ngOnInit(): void {
  }
  addNewSupplier() {
    if (this.addSupplierFormGroup.valid) {
      this.shared.addSupplier(this.addSupplierFormGroup.value).subscribe(data => {
        this.raiseAlert.raiseAlert("success", "Success", data.message);
      });
    }
    else {
      this.raiseAlert.raiseAlert("error", "Error", "Please check form validation");
    }
  }
}
