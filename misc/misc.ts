npm install date-fns

ng generate component recurrence-options

ng generate service recurrence

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  function addWeeks(date: Date, weeks: number): Date {
    return addDays(date, weeks * 7);
  }
  
  function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    const d = result.getDate();
    result.setMonth(result.getMonth() + months);
    // Handle the case where the new month has fewer days than the original date
    if (result.getDate() !== d) {
      result.setDate(0);
    }
    return result;
  }
  
  function setDate(date: Date, dayOfMonth: number): Date {
    const result = new Date(date);
    result.setDate(dayOfMonth);
    return result;
  }
  
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecurrenceService {

  constructor() { }

  generateRecurrence(startDate: Date, recurrenceType: string, interval: number, occurrences: number, selectedDays?: string[], dayOfMonth?: number): { dates: Date[], rrule: string } {
    const dates: Date[] = [];
    let currentDate = startDate;
    let rrule = `RRULE:FREQ=${recurrenceType.toUpperCase()};INTERVAL=${interval};COUNT=${occurrences}`;

    if (recurrenceType === 'weekly' && selectedDays) {
      let count = 0;
      const daysOfWeekMap: { [key: string]: string } = {
        'sunday': 'SU',
        'monday': 'MO',
        'tuesday': 'TU',
        'wednesday': 'WE',
        'thursday': 'TH',
        'friday': 'FR',
        'saturday': 'SA'
      };
      const byDay = selectedDays.map(day => daysOfWeekMap[day]).join(',');
      rrule += `;BYDAY=${byDay}`;
      while (count < occurrences) {
        if (selectedDays.includes(currentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase())) {
          dates.push(new Date(currentDate));
          count++;
        }
        currentDate = addDays(currentDate, 1);
        if (currentDate.getDay() === startDate.getDay() && count < occurrences) {
          currentDate = addWeeks(currentDate, interval - 1);
        }
      }
    } else if (recurrenceType === 'monthly' && dayOfMonth) {
      rrule += `;BYMONTHDAY=${dayOfMonth}`;
      for (let i = 0; i < occurrences; i++) {
        currentDate = setDate(currentDate, dayOfMonth);
        dates.push(new Date(currentDate));
        currentDate = addMonths(currentDate, interval);
      }
    } else {
      for (let i = 0; i < occurrences; i++) {
        dates.push(currentDate);

        switch (recurrenceType) {
          case 'daily':
            currentDate = addDays(currentDate, interval);
            break;
          case 'weekly':
            currentDate = addWeeks(currentDate, interval);
            break;
          case 'monthly':
            currentDate = addMonths(currentDate, interval);
            break;
          default:
            throw new Error('Invalid recurrence type');
        }
      }
    }

    return { dates, rrule };
  }
}



>recurrence-options.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recurrence-options',
  templateUrl: './recurrence-options.component.html',
  styleUrls: ['./recurrence-options.component.css']
})
export class RecurrenceOptionsComponent {
  @Input() recurrenceType: string = 'daily';
  @Input() interval: number = 1;
  @Input() occurrences: number = 10;
  @Input() selectedDays: string[] = [];
  @Input() dayOfMonth: number = 1;

  @Output() recurrenceTypeChange = new EventEmitter<string>();
  @Output() intervalChange = new EventEmitter<number>();
  @Output() occurrencesChange = new EventEmitter<number>();
  @Output() selectedDaysChange = new EventEmitter<string[]>();
  @Output() dayOfMonthChange = new EventEmitter<number>();

  daysOfWeek = [
    { name: 'Sunday', value: 'sunday' },
    { name: 'Monday', value: 'monday' },
    { name: 'Tuesday', value: 'tuesday' },
    { name: 'Wednesday', value: 'wednesday' },
    { name: 'Thursday', value: 'thursday' },
    { name: 'Friday', value: 'friday' },
    { name: 'Saturday', value: 'saturday' }
  ];

  toggleDaySelection(day: string) {
    const index = this.selectedDays.indexOf(day);
    if (index > -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }
    this.selectedDaysChange.emit(this.selectedDays);
  }
}

<div>
  <label>
    Recurrence Type:
    <select [(ngModel)]="recurrenceType" (ngModelChange)="recurrenceTypeChange.emit($event)">
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  </label>
  <br>
  <div *ngIf="recurrenceType === 'weekly'">
    <label>Select Days:</label>
    <div *ngFor="let day of daysOfWeek">
      <input type="checkbox" [value]="day.value" (change)="toggleDaySelection(day.value)" [checked]="selectedDays.includes(day.value)">
      {{ day.name }}
    </div>
    <br>
    <label>
      Interval in Weeks:
      <input [(ngModel)]="interval" (ngModelChange)="intervalChange.emit($event)" type="number" min="1" required>
    </label>
  </div>
  <div *ngIf="recurrenceType === 'monthly'">
    <label>
      Day of Month:
      <input [(ngModel)]="dayOfMonth" (ngModelChange)="dayOfMonthChange.emit($event)" type="number" min="1" max="31" required>
    </label>
    <br>
  </div>
  <label>
    Interval:
    <input [(ngModel)]="interval" (ngModelChange)="intervalChange.emit($event)" type="number" min="1" required>
  </label>
  <br>
  <label>
    Occurrences:
    <input [(ngModel)]="occurrences" (ngModelChange)="occurrencesChange.emit($event)" type="number" min="1" required>
  </label>
</div>


> in the event form
import { Component } from '@angular/core';
import { RecurrenceService } from '../recurrence.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventName: string = '';
  startDate: Date = new Date();
  recurrenceType: string = 'daily';
  interval: number = 1;
  occurrences: number = 10;
  selectedDays: string[] = [];
  dayOfMonth: number = 1;
  recurrenceDates: Date[] = [];
  rrule: string = '';

  constructor(private recurrenceService: RecurrenceService) { }

  createEvent() {
    const { dates, rrule } = this.recurrenceService.generateRecurrence(
      this.startDate,
      this.recurrenceType,
      this.interval,
      this.occurrences,
      this.selectedDays,
      this.recurrenceType === 'monthly' ? this.dayOfMonth : undefined
    );
    this.recurrenceDates = dates;
    this.rrule = rrule;
  }
}


<form (ngSubmit)="createEvent()">
  <label>
    Event Name:
    <input [(ngModel)]="eventName" name="eventName" required>
  </label>
  <br>
  <label>
    Start Date:
    <input [(ngModel)]="startDate" name="startDate" type="date" required>
  </label>
  <br>
  <app-recurrence-options 
    [(recurrenceType)]="recurrenceType"
    [(interval)]="interval"
    [(occurrences)]="occurrences"
    [(selectedDays)]="selectedDays"
    [(dayOfMonth)]="dayOfMonth">
  </app-recurrence-options>
  <br>
  <button type="submit">Create Event</button>
</form>

<div *ngIf="recurrenceDates.length">
  <h3>Recurrence Dates</h3>
  <ul>
    <li *ngFor="let date of recurrenceDates">{{ date | date:'fullDate' }}</li>
  </ul>
  <h3>RRULE</h3>
  <p>{{ rrule }}</p>
</div>
