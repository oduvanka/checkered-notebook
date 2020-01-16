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
}
