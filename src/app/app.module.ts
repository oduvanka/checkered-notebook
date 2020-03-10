import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxSvgModule } from 'ngx-svg';
import { NgxRulerModule } from 'ngx-ruler';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { PolylineListComponent } from './polyline-list/polyline-list.component';
import { CoordsPipe } from './coords.pipe';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { FrameComponent } from './frame/frame.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawComponent,
    ColorPickerComponent,
    PolylineListComponent,
    CoordsPipe,
    ClickStopPropagationDirective,
    FrameComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxSvgModule,
    NgxRulerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
