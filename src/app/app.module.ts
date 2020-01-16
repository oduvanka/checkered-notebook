import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxSvgModule } from 'ngx-svg';
import { DrawComponent } from './draw/draw.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { PolilyneEditorComponent } from './polilyne-editor/polilyne-editor.component';
import { PolylineListComponent } from './polyline-list/polyline-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    ColorPickerComponent,
    PolilyneEditorComponent,
    PolylineListComponent
  ],
  imports: [
    BrowserModule,
    NgxSvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
