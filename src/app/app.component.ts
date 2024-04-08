import { Component } from '@angular/core';
import { DataPoint } from './line-plot/line-plot-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public redPlotPoints: DataPoint[] = generateRandomData(100);
  public greenPlotPoints: DataPoint[] = generateRandomData(100);
  public bluePlotPoints: DataPoint[] = generateRandomData(20);
}

function generateRandomData(pointsCount: number, maxY: number = 1000, maxX: number = 100): DataPoint[] {
  return Array.from({length: pointsCount}, (_, i) => ({
    x: i * maxX / pointsCount,
    y: Math.random() * maxY
  }));
}
