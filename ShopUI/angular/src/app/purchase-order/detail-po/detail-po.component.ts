import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-po',
  templateUrl: './detail-po.component.html',
  styleUrls: ['./detail-po.component.css']
})
export class DetailPoComponent implements OnInit{


  orderNoToChildComponent: any;


  constructor(private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {this.orderNoToChildComponent = params['no'];});
  }

}