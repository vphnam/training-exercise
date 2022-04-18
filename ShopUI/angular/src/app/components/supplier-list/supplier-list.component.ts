import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchfilterPipe } from 'src/app/pipe/searchfilter.pipe';
import { ISupplier } from 'src/app/services/interface/interface.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, OnDestroy {

  supplierNoSearch = new FormControl(null);
  constructor(public search: SearchfilterPipe, private shared: SharedService) {}
  ngOnDestroy(): void {

  }
  supList!: ISupplier[];
    //pagination
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [5, 10, 20, 50, 100];
  onTableDataChange(event: any){
    this.page = event;
    this.refreshSupplierList();
  }
  onTableSizeChange(event: any){
    this.tableSize = event.target.value;
    this.page = 1;
    this.refreshSupplierList();
  }
  ngOnInit(): void {
    this.refreshSupplierList();
  }
  refreshSupplierList()
  {
    this.shared.getSupplierList().subscribe(data => {
      this.supList = data;
    });
  }

}
