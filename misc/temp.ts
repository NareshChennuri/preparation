<mat-tab-group (selectedTabChange)="onTabChange($event.index)">
  <mat-tab label="Region"></mat-tab>
  <mat-tab label="Chapter"></mat-tab>
  <mat-tab label="Event Type"></mat-tab>
</mat-tab-group>

<!-- Mat Table -->
<mat-table [dataSource]="dataSource" matSort>

  <!-- Dynamic Columns -->
  <ng-container *ngFor="let column of tableColumns" [matColumnDef]="column.key">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.label}} </th>
    <td mat-cell *matCellDef="let element"> {{element[column.key]}} </td>
  </ng-container>

  <!-- Header and Row Declarations -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

</mat-table>

<!-- Paginator -->
<mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons></mat-paginator>


import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  data = [
    {
      "id": 43704,
      "eventId": 1510,
      "metricType": "REG_COUNT",
      "executionStartDate": "2024-09-11T00:00:00Z",
      "eventTitle": "fsgdbsdfg",
      "programOfferings": "COHORTS",
      "region": "APAC-IST",
      "language": "Java",
      "standardId": "ZK1M4MS"
    },
    // Other data
  ];

  tableData: any[] = [];
  tableColumns: { key: string, label: string }[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.groupByRegion(); // Default to "Region" view on load
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onTabChange(index: number) {
    switch (index) {
      case 0:
        this.groupByRegion();
        break;
      case 1:
        this.groupByChapter();
        break;
      case 2:
        this.groupByEventType();
        break;
    }
  }

  groupByRegion() {
    const regionMap = new Map();

    this.data.forEach(event => {
      const key = event.region;
      if (!regionMap.has(key)) {
        regionMap.set(key, {
          region: event.region,
          eventType: event.programOfferings,
          eventCount: 0,
          distinctParticipants: new Set(),
          registrations: new Set()
        });
      }
      const regionData = regionMap.get(key);
      regionData.eventCount++;
      regionData.distinctParticipants.add(event.standardId);
      regionData.registrations.add(event.eventId);
    });

    this.tableData = Array.from(regionMap.values()).map(item => ({
      region: item.region,
      eventType: item.eventType,
      eventCount: item.eventCount,
      distinctParticipants: item.distinctParticipants.size,
      registrations: item.registrations.size
    }));

    this.tableColumns = [
      { key: 'region', label: 'Region' },
      { key: 'eventType', label: 'Event Type' },
      { key: 'eventCount', label: 'Count' },
      { key: 'distinctParticipants', label: 'Distinct Participants' },
      { key: 'registrations', label: 'Registrations' },
    ];

    this.displayedColumns = this.tableColumns.map(col => col.key);
    this.updateTableData();
  }

  groupByChapter() {
    const chapterMap = new Map();

    this.data.forEach(event => {
      const key = event.language;
      if (!chapterMap.has(key)) {
        chapterMap.set(key, {
          chapter: event.language,
          eventType: event.programOfferings,
          eventCount: 0,
          distinctParticipants: new Set(),
          registrations: new Set()
        });
      }
      const chapterData = chapterMap.get(key);
      chapterData.eventCount++;
      chapterData.distinctParticipants.add(event.standardId);
      chapterData.registrations.add(event.eventId);
    });

    this.tableData = Array.from(chapterMap.values()).map(item => ({
      chapter: item.chapter,
      eventType: item.eventType,
      eventCount: item.eventCount,
      distinctParticipants: item.distinctParticipants.size,
      registrations: item.registrations.size
    }));

    this.tableColumns = [
      { key: 'chapter', label: 'Chapter' },
      { key: 'eventType', label: 'Event Type' },
      { key: 'eventCount', label: 'Count' },
      { key: 'distinctParticipants', label: 'Distinct Participants' },
      { key: 'registrations', label: 'Registrations' },
    ];

    this.displayedColumns = this.tableColumns.map(col => col.key);
    this.updateTableData();
  }

  groupByEventType() {
    const eventTypeMap = new Map();

    this.data.forEach(event => {
      const key = event.programOfferings;
      if (!eventTypeMap.has(key)) {
        eventTypeMap.set(key, {
          eventType: event.programOfferings,
          chapter: event.language,
          eventCount: 0,
          distinctParticipants: new Set(),
          registrations: new Set()
        });
      }
      const eventTypeData = eventTypeMap.get(key);
      eventTypeData.eventCount++;
      eventTypeData.distinctParticipants.add(event.standardId);
      eventTypeData.registrations.add(event.eventId);
    });

    this.tableData = Array.from(eventTypeMap.values()).map(item => ({
      eventType: item.eventType,
      chapter: item.chapter,
      eventCount: item.eventCount,
      distinctParticipants: item.distinctParticipants.size,
      registrations: item.registrations.size
    }));

    this.tableColumns = [
      { key: 'eventType', label: 'Event Type' },
      { key: 'chapter', label: 'Chapter' },
      { key: 'eventCount', label: 'Count' },
      { key: 'distinctParticipants', label: 'Distinct Participants' },
      { key: 'registrations', label: 'Registrations' },
    ];

    this.displayedColumns = this.tableColumns.map(col => col.key);
    this.updateTableData();
  }

  updateTableData() {
    this.dataSource.data = this.tableData;
  }
}
