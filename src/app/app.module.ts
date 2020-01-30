import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxSvgModule } from 'ngx-svg';
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
    NgxSvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
