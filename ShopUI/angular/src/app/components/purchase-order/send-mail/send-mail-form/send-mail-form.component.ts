import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
          this.sendmailForm.controls['from'].setValue(this.po.stockSiteNavigation.email);
          this.sendmailForm.controls['subject'].setValue("Order [" + this.po.orderNo + " - " + this.po.stockName+"]");
          this.sendmailForm.controls['contains'].setValue(this.containsFormat.header + '\n' + this.containsFormat.body + '\n' 
          + this.containsFormat.body2 + this.po.orderNo + '\n' + this.containsFormat.footer + ",");
      });
  }
  onSubmit()
  {
    this.po.sentMail = true;
    this.service.sendMail(this.po).subscribe(data => 
    {
      Swal.fire('Success', data.message);
    });
  }
}
