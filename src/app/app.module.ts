import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NgxSvgModule } from 'ngx-svg';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { PolylineListComponent } from './polyline-list/polyline-list.component';
import { CoordsPipe } from './coords.pipe';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    ColorPickerComponent,
    PolylineListComponent,
    CoordsPipe,
    ClickStopPropagationDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgxSvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
