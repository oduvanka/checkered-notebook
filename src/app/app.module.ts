import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxSvgModule } from 'ngx-svg';
import { DrawComponent } from './draw/draw.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent
  ],
  imports: [
    BrowserModule,
    NgxSvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
