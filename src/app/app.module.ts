import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { HourComponentComponent } from './components/datepicker/components/hour-component/hour-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    HourComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
