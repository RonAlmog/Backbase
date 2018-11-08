import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionsService } from './services/transactions.service';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TransferComponent,
    TransactionsComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,


  ],
  providers: [
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
