import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import * as d3 from "d3";
import { Subject, combineLatest } from 'rxjs';
import { LinePlotData, DataPoint } from './line-plot-data';
import { LinePlotSelectionEvent } from './line-plot-selection-event';

interface Selection {
  startComponentX: number;
  startComponentY: number;
  endComponentX: number;
}

const PADDING_PX = 32;

@Component({
  selector: 'app-line-plot',
  templateUrl: './line-plot.component.html',
  styleUrls: ['./line-plot.component.scss']
})
export class LinePlotComponent implements AfterViewInit {
  @ViewChild("plotSvg", {static: true}) private plotSvgElement: ElementRef;

  @Output() public selectionStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() public selectionChange: EventEmitter<LinePlotSelectionEvent> = new EventEmitter<LinePlotSelectionEvent>();

  private plotSvg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private xScale: d3.ScaleLinear<number, number>;
  private yScale: d3.ScaleLinear<number, number>;

  private dataSubject: Subject<LinePlotData> = new Subject<LinePlotData>();
  private viewInitializedSubject: Subject<void> = new Subject<void>();

  private selections: Selection[] = [];
  private isDragging = false;

  constructor() {
    combineLatest([this.dataSubject, this.viewInitializedSubject])
      .subscribe(([data]) => this.drawPlot(data));
  }

  @Input()
  public set data(data: LinePlotData) {
    this.dataSubject.next(data);
  }

  public ngAfterViewInit(): void {
    this.plotSvg = d3.select(this.plotSvgElement.nativeElement);
    this.viewInitializedSubject.next();
  }

  private drawPlot(data: LinePlotData): void {
    const {width, height} = this.plotSvgElement.nativeElement.getBoundingClientRect();

    this.configScales(data, width, height);
    this.drawScales();

    this.drawData(data);

    this.addSelectionHandlers();
  }

  private configScales(data: LinePlotData, width: number, height: number): void {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    data.points.forEach(point => {
      if (point.x < minX) {
        minX = point.x;
      }
      if (point.x > maxX) {
        maxX = point.x;
      }
      if (point.y < minY) {
        minY = point.y;
      }
      if (point.y > maxY) {
        maxY = point.y;
      }
    });

    this.xScale = d3.scaleLinear()
      .domain([minX, maxX])
      .range([PADDING_PX, width - PADDING_PX]);

    this.yScale = d3.scaleLinear()
      .domain([minY, maxY])
      .range([height - PADDING_PX, PADDING_PX]);
  }

  private drawScales() {
    // Draw X axis.
    this.plotSvg.append("g")
      .attr("transform", `translate(0, ${this.yScale.range()[0]})`)
      .call(d3.axisBottom(this.xScale));

    // Draw Y axis.
    this.plotSvg.append("g")
      .attr("transform", `translate(${this.xScale.range()[0]}, 0)`)
      .call(d3.axisLeft(this.yScale));
  }

  private drawData(data: LinePlotData): void {
    // Create a line generator for objects with x and y properties
    const line = d3.line<DataPoint>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y));

    // Draw the random line
    this.plotSvg.append("path")
      .datum(data.points)
      .attr("fill", "none")
      .attr("stroke", data.color)
      .attr("stroke-width", 2)
      .attr("d", line);
  }

  private addSelectionHandlers() {
    // this.plotSvg.call(d3.drag<SVGSVGElement, unknown, unknown>()
    //   .on("start", (event) => {
    //     this.selections.push({
    //       startComponentX: event.x,
    //       startComponentY: event.y,
    //       endComponentX: event.x,
    //     });
    //     this.selectionStart.emit();
    //   })
    //   .on("drag", (event) => {
    //     // update the last selection
    //     const lastSelection = this.selections[this.selections.length - 1];
    //     lastSelection.endComponentX = event.x;
    //
    //     // Emit the selection change event.
    //     this.selectionChange.emit({
    //       start: this.xScale.invert(lastSelection.startComponentX),
    //       end: this.xScale.invert(lastSelection.endComponentX)
    //     });
    //
    //     // redraw all selections
    //     this.plotSvg.selectAll(".selection").remove();
    //     this.selections.forEach(selection => {
    //       this.plotSvg.append("line")
    //         .attr("class", "selection")
    //         .attr("x1", selection.startComponentX)
    //         .attr("x2", selection.endComponentX)
    //         .attr("y1", selection.startComponentY)
    //         .attr("y2", selection.startComponentY)
    //         .attr("stroke", "black")
    //         .attr("stroke-width", 2);
    //     });
    //   })
    // );

    this.plotSvg.on("mousedown", (event) => {
      console.log("mousedown", event);
      this.isDragging = true;
      this.selections.push({
        startComponentX: event.offsetX,
        startComponentY: event.offsetY,
        endComponentX: event.offsetX,
      });
      this.selectionStart.emit();
    });

    this.plotSvg.on("mousemove", (event) => {
      if (!this.isDragging) {
        return;
      }

      const lastSelection = this.selections[this.selections.length - 1];
      lastSelection.endComponentX = event.x;

      // Emit the selection change event.
      this.selectionChange.emit({
        start: this.xScale.invert(lastSelection.startComponentX),
        end: this.xScale.invert(lastSelection.endComponentX)
      });

      // redraw all selections
      this.plotSvg.selectAll(".selection").remove();
      this.selections.forEach(selection => {
        this.plotSvg.append("line")
          .attr("class", "selection")
          .attr("x1", selection.startComponentX)
          .attr("x2", selection.endComponentX)
          .attr("y1", selection.startComponentY)
          .attr("y2", selection.startComponentY)
          .attr("stroke", "black")
          .attr("stroke-width", 2);
      });
    });

    this.plotSvg.on("mouseup", (event) => {
      console.log("mouseup", event);
      this.isDragging = false;
    });
  }
}
