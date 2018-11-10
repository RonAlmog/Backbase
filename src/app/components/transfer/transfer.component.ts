import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  myTransaction: any = {
    'amount': '0',
    'categoryCode': '#ff0000',
    'merchantLogo': '',
    'merchant': 'Amazon Online Store',
    'transactionDate': 1476836642000,
    'transactionType': 'Online Transfer'
  };
  accountName = 'Free Checking(4692)';
  balance = 5824.76;
  masOverDraft = -500;
  amount = 0;
  toAccount = '';
  showPreview = false;
  previewMessage = '';
  validTransaction = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.tranForm = this.formBuilder.group({
      // fromAccount: new FormControl('', [Validators.required]),
      toAccount: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9.]*$')])
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
    if (this.balance - this.amount > this.masOverDraft) {
      this.validTransaction = true;
      this.previewMessage = '<strong>All good.</strong><br>Your transaction is valid';
    } else {
      this.validTransaction = false;
      this.previewMessage = '<strong>Insufficient funds.</strong><br>Your transaction is invalid';
    }
    this.showPreview = true;
  }

  transfer() {
    console.log('form', this.tranForm.value);
    this.myTransaction.merchantLogo = this.transactions[0].merchantLogo,
    this.myTransaction.amount = this.amount;
    this.myTransaction.transactionDate = new Date();
    this.myTransaction.merchant = this.toAccount;
    this.balance = this.balance - this.amount;
    this.pushTransaction.emit(this.myTransaction);
    this.showPreview = false;
    this.toastrService.success(`Your transaction of $${this.amount} was successful.`, 'Success!');
    // clear form
    this.f.toAccount.setValue('');
    this.f.amount.setValue('');
    this.submitted = false;

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
