import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/purchase-order/services/shared.service';
import { AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit, AfterViewInit{

  constructor(private service: SharedService, private route: ActivatedRoute) { }
  ngAfterViewInit(): void {
  }
  no!: number;
  ngOnInit(): void {
    this.routerParams();
  }
  routerParams()
  {
    this.route.params.subscribe(params => {this.no = params['no']});
  }
}
