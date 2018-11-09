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
  demoTransaction: any = {
    'amount': '99.99',
    'categoryCode': '#ff0000',
    'merchantLogo': '',
    'merchant': 'Amazon Online Store',
    'transactionDate': 1476836642000,
    'transactionType': 'Online Transfer'
  };
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tranForm = this.formBuilder.group({
      fromAccount: new FormControl('Free Checking(4692) - $5824.76', [Validators.required]),
      toAccount: new FormControl('', [Validators.required]),
      amount: new FormControl('0', [Validators.required])
    });
  }

  makeTransfer() {
    console.log('form', this.tranForm.value);
    this.demoTransaction.merchantLogo = this.transactions[0].merchantLogo,
    this.pushTransaction.emit(this.demoTransaction);

  }

}
