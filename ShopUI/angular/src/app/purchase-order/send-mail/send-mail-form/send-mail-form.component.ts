import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-send-mail-form',
  templateUrl: './send-mail-form.component.html',
  styleUrls: ['./send-mail-form.component.css']
})
export class SendMailFormComponent implements OnInit {
  @Input() no!: number;
  po: any = [];
  containsFormat: any = 
  {
    header: 'Hi,',
    body: 'Please process the attached order directly into our customer as stipulated on the attached PO.',
    body2: 'PO number: ',
    footer: 'Kind regards'
  };

  sendmailForm = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl(null, [Validators.required]),
    cc: new FormControl(null),
    subject: new FormControl('', Validators.required),
    contains: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshSendMailForm(this.no);

  }
  refreshSendMailForm(no: number)
  {
    this.service.getOneRecordPurchaseOrderByOrderNo(no).subscribe(data => 
      {
          this.po = data;
          this.sendmailForm.controls['from'].setValue(this.po.StockSiteNavigation.Email);
          this.sendmailForm.controls['subject'].setValue("Order [" + this.po.OrderNo + " - " + this.po.StockName+"]");
          this.sendmailForm.controls['contains'].setValue(this.containsFormat.header + '\n' + this.containsFormat.body + '\n' 
          + this.containsFormat.body2 + this.po.OrderNo + '\n' + this.containsFormat.footer + ",");
      });
  }
  onSubmit()
  {
    console.warn(this.sendmailForm.value);
  }
  SendMail()//val:any)
  {
    /*val.SentMail = true;
    this.service.sendMail(val).subscribe(data => 
    {
        alert(data);
    });*/
  }
}
