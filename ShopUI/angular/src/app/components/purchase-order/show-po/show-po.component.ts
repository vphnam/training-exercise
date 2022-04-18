import { Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { IPo } from 'src/app/services/interface/interface.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { SearchfilterPipe } from 'src/app/pipe/searchfilter.pipe';
@Component({
  selector: 'app-show-po',
  templateUrl: './show-po.component.html',
  styleUrls: ['./show-po.component.css'],
})
export class ShowPoComponent implements OnInit, OnDestroy {
  constructor(private service: SharedService, private route: ActivatedRoute, 
    private modalService: NgbModal, public search: SearchfilterPipe) { 
      this.refreshPurchaseOrderList();
  }
  ngOnDestroy(): void {
  }
  openDialog(content: any) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }, (reason) => {
      
    });
  }
  //search form
  searchForm = new FormGroup({
    orderNoSearch: new FormControl(null),
    supplierNameSearch: new FormControl(null),
    stockSiteSearch: new FormControl(null),
    stockNameSearch: new FormControl(null),
    orderDateSearch: new FormControl(null),
    sentMailSearch: new FormControl(null),
  });
  //search att
    orderNoSearch!: string;
    supplierNameSearch!: string;
    stockSiteSearch!: string;
    stockNameSearch!: string;
    orderDateSearch!: Date;
    sentMailSearch!: boolean;
  //pagination
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [5, 10, 20, 50,100];
  //
  poList!: IPo[];
  poSearch: any =[];
  //
  closeModal: boolean = false;
  
  //poListForm: any;
  ngOnInit(): void {  
      this.debounceTimeForFormGroup();
  }
  debounceTimeForFormGroup(){
    this.searchForm.controls['orderNoSearch'].valueChanges.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(res => {this.orderNoSearch = res});
    this.searchForm.controls['supplierNameSearch'].valueChanges.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(res => {this.supplierNameSearch = res});
    this.searchForm.controls['stockSiteSearch'].valueChanges.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(res => {this.stockSiteSearch = res});
    this.searchForm.controls['stockNameSearch'].valueChanges.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(res => {this.stockNameSearch = res});
    this.searchForm.controls['orderDateSearch'].valueChanges.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(res => {this.orderDateSearch = res});
    this.searchForm.controls['sentMailSearch'].valueChanges.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(res => {this.sentMailSearch = res});
  };

  HiddenModal()
  {
     this.modalService.dismissAll();
  }
  refreshFilterBtnClick()
  {
    this.searchForm.controls['orderNoSearch'].setValue(null);
    this.searchForm.controls['supplierNameSearch'].setValue(null);
    this.searchForm.controls['stockSiteSearch'].setValue(null);
    this.searchForm.controls['stockNameSearch'].setValue(null);
    this.searchForm.controls['orderDateSearch'].setValue(null);
    this.searchForm.controls['sentMailSearch'].setValue(null);
  }
  refreshPurchaseOrderList(){
    this.service.getPurchaseOrderList().subscribe(data => {
      this.poList = data;
    });
  }
  onTableDataChange(event: any){
    this.page = event;
    this.refreshPurchaseOrderList();
  }
  onTableSizeChange(event: any){
    this.tableSize = event.target.value;
    this.page = 1;
    this.refreshPurchaseOrderList();
  }
}