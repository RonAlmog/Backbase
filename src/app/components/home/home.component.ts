import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transactions: any[] = [];

  constructor(
    private transactionsService: TransactionsService
  ) { }

  ngOnInit() {
    this.transactionsService.getJSON().subscribe(data => {
      this.transactions = data.data;
    });
  }

  addTransaction(tran: any) {
    this.transactions.push(tran);
  }

}
