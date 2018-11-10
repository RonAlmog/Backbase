import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  @Input() transactions: any[] = [];
  @Output() pushTransaction = new EventEmitter();

  tranForm: FormGroup;
  submitted = false;
  demoTransaction: any = {
    'amount': '99.99',
    'categoryCode': '#ff0000',
    'merchantLogo': '',
    'merchant': 'Amazon Online Store',
    'transactionDate': 1476836642000,
    'transactionType': 'Online Transfer'
  };
  accountName = 'Free Checking(4692)';
  balance = 1000.76;
  amount = 0;
  toAccount = '';
  showPreview = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tranForm = this.formBuilder.group({
      // fromAccount: new FormControl('', [Validators.required]),
      toAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    });
  }

  // convenience getter ;)
  get f() { return this.tranForm.controls; }

  preview() {
    this.submitted = true;
    if (this.tranForm.invalid) {
      return;
    }
    console.log('form', this.tranForm.value);
    console.log('amount', this.tranForm.value.amount);
    this.amount = this.asNumber(this.tranForm.value.amount);
    this.toAccount = this.tranForm.value.toAccount;
    this.showPreview = true;
  }

  transfer() {
    console.log('form', this.tranForm.value);
    this.demoTransaction.merchantLogo = this.transactions[0].merchantLogo,
    this.pushTransaction.emit(this.demoTransaction);

  }

  validate(): boolean {
    console.log('amount', this.tranForm.value.amount);
    return true;

  }

  asNumber(num) {
    if (Number.isNaN(Number.parseFloat(num))) {
      return 0;
    }
    return parseFloat(num);
  }

  cancelPreview() {
    this.showPreview = false;
  }

}
