import { Component } from '@angular/core';
import { Polyline } from './polyline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testDraw10';

  polylines: Polyline[] = [];
  isEditPolyLine: boolean = false;

  // ссылка на редактируемый элемент массива polylines
  selectedPolyline: Polyline = {id: "-", coords: [], color: ""};

  // копия редактируемого элемента массива, для отмены изменений
  selectedPolylineCopyBefore: Polyline = {id: "-", coords: [], color: ""};
}
