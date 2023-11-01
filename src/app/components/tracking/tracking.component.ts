import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription, throwError} from "rxjs";
import {ApiService} from "../../services/api.service";
import {catchError} from "rxjs/operators";
import Chart, {ChartType} from 'chart.js/auto';
import {TrackingCreatedNote, TrackingUpdatedNote} from "../../interfaces";
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {

  private getTrackingCreatedNotes: Subscription = new Subscription();
  private getTrackingUpdatedNotes: Subscription = new Subscription();

  chart?: Chart<ChartType, string[], string>;
  createdNotes: TrackingCreatedNote[] = [];
  updatedNotes: TrackingUpdatedNote[] = [];
  dates: string[] = [];
  endDate: string = (new Date()).toUTCString();
  startDate: string = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString();

  constructor(private _apiService: ApiService) {}
  ngOnInit(): void {

    forkJoin([
      this._apiService.trackingCreatedDate(this.startDate, this.endDate),
      this._apiService.trackingUpdatedDate(this.startDate, this.endDate)
    ])
      .pipe(
        catchError((error) => throwError(error))
      )
      .subscribe((results) => {
        this.createdNotes = results[0];
        this.updatedNotes = results[1];
        this.datesArray();
        this.createChart();
      });
  }

  ngOnDestroy(): void {
    this.getTrackingCreatedNotes.unsubscribe();
    this.getTrackingUpdatedNotes.unsubscribe();
  }


  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line',

      data: {
        labels: this.dates,
        datasets: [
          {
            label: "Created Notes",
            data: this.fillArrayWithValues(this.createdNotes),
          },
          {
            label: "Updated Notes",
            data: this.fillArrayWithValues(this.updatedNotes),
          },
        ]
      },
      options: {
        responsive: true,
      }

    });
  }


  datesArray() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    while (startDate <= endDate) {
      this.dates.push((new Date(startDate)).toLocaleDateString());
      startDate.setDate(startDate.getDate() + 1);
    }
  }
  fillArrayWithValues(data: (TrackingCreatedNote | TrackingUpdatedNote)[]): string[] {
    const filledArray: string[] = new Array(this.dates.length).fill('0');

    data.forEach((item) => {
      const dateField = 'createdAt' in item ? item.createdAt : item.updatedAt;
      const createdAtDate = new Date(dateField).toLocaleDateString();
      const index = this.dates.indexOf(createdAtDate);
      if (index !== -1) {
        filledArray[index] = item.noteCount.toString();
      }
    });
    return filledArray;
  }
}
