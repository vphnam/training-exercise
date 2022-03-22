import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-po',
  templateUrl: './detail-po.component.html',
  styleUrls: ['./detail-po.component.css']
})
export class DetailPoComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  @Input() orderNo: any = "hahaha";
  ngOnInit(): void {
    //this.route.params.subscribe(params => {this.orderNo = params;});
  }
}