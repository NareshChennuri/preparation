selectedPageVisits: string = 'tfgsignup';

onPageVisitsSelection(event: any): void {
  this.updateChart();
}

// Update the chart based on the selected data
updateChart(): void {
  if (this.selectedPageVisits === 'TFGSignup') {
    this.barChartLabels = this.visitsData.map(item => new Date(item.createdDate).getDate().toString());
    this.barChartData = [
      { data: this.visitsData.map(item => item.visitsCount), label: 'Visits Count' }
    ];
  } else if (this.selectedData === 'TFGCalendar') {
    this.barChartLabels = this.eventsData.map(item => new Date(item.eventStartDate).getDate().toString());
    this.barChartData = [
      { data: this.eventsData.map(item => item.eventsCount), label: 'Events Count' }
    ];
  }
}


<div class="chart-container">
  <mat-form-field appearance="fill">
    <mat-select [(value)]="selectedPageVisits" (selectionChange)="onPageVisitsSelection($event)">
      <mat-option value="tfgsignup">Visits Data</mat-option>
      <mat-option value="tfgcalendar">Events Data</mat-option>
    </mat-select>
  </mat-form-field>

  <div *ngIf="chartData">
    <canvas baseChart
      [datasets]="barChartData"
      [labels]="barChartLabels"
      [options]="barChartOptions"
      [legend]="barChartLegend"
      [chartType]="barChartType">
    </canvas>
  </div>
</div>
