import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Po } from 'src/app/services/interface.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AddPoComponent } from './add-po/add-po.component';
@Component({
  selector: 'app-show-po',
  templateUrl: './show-po.component.html',
  styleUrls: ['./show-po.component.css'],
})
export class ShowPoComponent implements OnInit {
  constructor(private service: SharedService, private route: ActivatedRoute, private modalService: NgbModal) { 
  }
  openDialog(content: any) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }, (reason) => {
      
    });
  }
  //search attributes
  orderNoSearch!: string;
  supplierNameSearch!: string;
  stockSiteSearch!: string;
  stockNameSearch!: string;
  orderDateSearch!: any;
  sentMailSearch!: any;
  //pagination
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [5, 10, 20, 50,100];
  //
  poList!: Po[];
  poSearch: any =[];
  //
  closeModal: boolean = false;
  
  //poListForm: any;
  ngOnInit(): void {
    this.refreshPurchaseOrderList();
  }
  HiddenModal(e:any)
  {
     console.warn("co vo day ko troi");
     this.modalService.dismissAll();
  }
  refreshFilterBtnClick()
  {
    this.orderNoSearch = '';
    this.supplierNameSearch = '';
    this.stockSiteSearch = '';
    this.stockNameSearch = '';
    this.orderDateSearch = undefined;
    this.sentMailSearch = undefined;
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