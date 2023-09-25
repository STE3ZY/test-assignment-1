import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PizzaMenuComponent } from './pizza-menu/pizza-menu.component';

@NgModule({
  declarations: [AppComponent, PizzaMenuComponent],
  imports: [FormsModule, NgbModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
