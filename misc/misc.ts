npm install rrule
ng generate component recurring-pattern-widget

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  

import { Component, Input, OnInit } from '@angular/core';
import { RRule, rrulestr } from 'rrule';

@Component({
  selector: 'app-recurring-pattern-widget',
  templateUrl: './recurring-pattern-widget.component.html',
  styleUrls: ['./recurring-pattern-widget.component.css']
})
export class RecurringPatternWidgetComponent implements OnInit {
  @Input() recurrenceRule: string | null = null;

  frequency: string = 'DAILY';
  interval: number = 1;
  dailyOption: string = 'every';
  weeklyInterval: number = 1;
  monthlyOption: string = 'day';
  monthlyInterval: number = 1;
  bymonthday: number = 1;
  bysetpos: number = 1;
  byweekday: string = 'MO';
  yearlyOption: string = 'day';
  yearBymonth: number = 1;
  yearByweekday: string = 'MO';
  yearBysetpos: number = 1;
  count: number | null = null;
  until: Date | null = null;

  frequencies = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];
  dailyOptions = ['every', 'weekday'];
  monthlyOptions = ['day', 'weekday'];
  yearlyOptions = ['day', 'weekday'];
  weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  setposOptions = ['1st', '2nd', '3rd', '4th', 'last'];
  months = Array.from({ length: 12 }, (_, i) => i + 1);

  ngOnInit() {
    if (this.recurrenceRule) {
      this.parseRRule(this.recurrenceRule);
    } else {
      // Default values when recurrenceRule is empty
      this.frequency = 'DAILY';
      this.interval = 1;
    }
  }

  toggleWeekday(day: string, event: any) {
    if (event.target.checked) {
      this.byweekday.push(RRule[day]);
    } else {
      this.byweekday = this.byweekday.filter(d => d !== RRule[day]);
    }
  }

  parseRRule(rruleStr: string) {
    const rule = rrulestr(rruleStr) as RRule;

    this.frequency = RRule.FREQUENCIES[rule.options.freq];
    this.interval = rule.options.interval;

    if (this.frequency === 'DAILY') {
      this.dailyOption = rule.options.byweekday ? 'weekday' : 'every';
    } else if (this.frequency === 'WEEKLY') {
      this.weeklyInterval = rule.options.interval;
      this.byweekday = rule.options.byweekday?.map((day: any) => day.weekday) || [];
    } else if (this.frequency === 'MONTHLY') {
      this.monthlyOption = rule.options.bysetpos ? 'weekday' : 'day';
      if (this.monthlyOption === 'day') {
        this.bymonthday = rule.options.bymonthday[0];
      } else {
        this.bysetpos = rule.options.bysetpos[0];
        this.byweekday = RRule.DAYS[rule.options.byweekday[0].weekday];
      }
      this.monthlyInterval = rule.options.interval;
    } else if (this.frequency === 'YEARLY') {
      this.yearBymonth = rule.options.bymonth[0];
      this.yearlyOption = rule.options.bysetpos ? 'weekday' : 'day';
      if (this.yearlyOption === 'day') {
        this.bymonthday = rule.options.bymonthday[0];
      } else {
        this.yearBysetpos = rule.options.bysetpos[0];
        this.yearByweekday = RRule.DAYS[rule.options.byweekday[0].weekday];
      }
    }

    this.count = rule.options.count || null;
    this.until = rule.options.until ? new Date(rule.options.until) : null;
  }

  generateRRule(): string {
    const options: any = {
      freq: RRule[this.frequency],
      interval: this.frequency === 'WEEKLY' ? this.weeklyInterval : this.frequency === 'MONTHLY' ? this.monthlyInterval : this.interval,
    };

    if (this.frequency === 'DAILY') {
      if (this.dailyOption === 'weekday') {
        options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
      }
    } else if (this.frequency === 'WEEKLY') {
      options.byweekday = this.byweekday.map(day => RRule[day]);
    } else if (this.frequency === 'MONTHLY') {
      if (this.monthlyOption === 'day') {
        options.bymonthday = this.bymonthday;
      } else if (this.monthlyOption === 'weekday') {
        options.bysetpos = [this.bysetpos];
        options.byweekday = [RRule[this.byweekday]];
      }
    } else if (this.frequency === 'YEARLY') {
      options.bymonth = this.yearBymonth;
      if (this.yearlyOption === 'day') {
        options.bymonthday = this.bymonthday;
      } else if (this.yearlyOption === 'weekday') {
        options.bysetpos = [this.yearBysetpos];
        options.byweekday = [RRule[this.yearByweekday]];
      }
    }

    if (this.count) {
      options.count = this.count;
    } else if (this.until) {
      options.until = this.until;
    }

    const rule = new RRule(options);
    return rule.toString();
  }
}

<div>
  <h3>Recurring Pattern Widget</h3>

  <div>
    <mat-form-field appearance="fill">
      <mat-label>Frequency</mat-label>
      <mat-select [(ngModel)]="frequency">
        <mat-option *ngFor="let freq of frequencies" [value]="freq">{{freq}}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>

  <div *ngIf="frequency === 'DAILY'">
    <mat-form-field appearance="fill">
      <mat-label>Daily Option</mat-label>
      <mat-select [(ngModel)]="dailyOption">
        <mat-option *ngFor="let option of dailyOptions" [value]="option">{{option}}</mat-option>
      </mat-select>
    </mat-form-field>
    <div *ngIf="dailyOption === 'every'">
      <mat-form-field appearance="fill">
        <mat-label>Interval</mat-label>
        <input matInput type="number" [(ngModel)]="interval" min="1" />
      </mat-form-field>
    </div>
  </div>

  <div *ngIf="frequency === 'WEEKLY'">
    <mat-form-field appearance="fill">
      <mat-label>Recur every</mat-label>
      <input matInput type="number" [(ngModel)]="weeklyInterval" min="1" /> week(s)
    </mat-form-field>
    <div>
      <label>On:</label>
      <div *ngFor="let day of weekdays">
        <mat-checkbox [value]="day" (change)="toggleWeekday(day, $event)" [checked]="byweekday.includes(day)">{{day}}</mat-checkbox>
      </div>
    </div>
  </div>

  <div *ngIf="frequency === 'MONTHLY'">
    <mat-form-field appearance="fill">
      <mat-label>Monthly Option</mat-label>
      <mat-select [(ngModel)]="monthlyOption">
        <mat-option *ngFor="let option of monthlyOptions" [value]="option">{{option}}</mat-option>
      </mat-select>
    </mat-form-field>

    <div *ngIf="monthlyOption === 'day'">
      <mat-form-field appearance="fill">
        <mat-label>Day</mat-label>
        <input matInput type="number" [(ngModel)]="bymonthday" min="1" max="31" />
      </mat-form-field>
    </div>

    <div *ngIf="monthlyOption === 'weekday'">
      <mat-form-field appearance="fill">
        <mat-label>The</mat-label>
        <mat-select [(ngModel)]="bysetpos">
          <mat-option *ngFor="let pos of setposOptions" [value]="pos">{{pos}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Day</mat-label>
        <mat-select [(ngModel)]="byweekday">
          <mat-option *ngFor="let day of weekdays" [value]="day">{{day}}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>

    <mat-form-field appearance="fill">
      <mat-label>Of every</mat-label>
      <input matInput type="number" [(ngModel)]="monthlyInterval" min="1" /> month(s)
    </mat-form-field>
  </div>

  <div *ngIf="frequency === 'YEARLY'">
    <mat-form-field appearance="fill">
      <mat-label>Yearly Option</mat-label>
      <mat-select [(ngModel)]="yearlyOption">
        <mat-option *ngFor="let option of yearlyOptions" [value]="option">{{option}}</mat-option>
      </mat-select>
    </mat-form-field>

    <div *ngIf="yearlyOption === 'day'">
      <mat-form-field appearance="fill">
        <mat-label>Month</mat-label>
        <mat-select [(ngModel)]="yearBymonth">
          <mat-option *ngFor="let month of months" [value]="month">{{month}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Day</mat-label>
        <input matInput type="number" [(ngModel)]="bymonthday" min="1" max="31" />
      </mat-form-field>
    </div>

    <div *ngIf="yearlyOption === 'weekday'">
      <mat-form-field appearance="fill">
        <mat-label>The</mat-label>
        <mat-select [(ngModel)]="yearBysetpos">
          <mat-option *ngFor="let pos of setposOptions" [value]="pos">{{pos}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Day</mat-label>
        <mat-select [(ngModel)]="yearByweekday">
          <mat-option *ngFor="let day of weekdays" [value]="day">{{day}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Of</mat-label>
        <mat-select [(ngModel)]="yearBymonth">
          <mat-option *ngFor="let month of months" [value]="month">{{month}}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  </div>

  <div>
    <mat-form-field appearance="fill">
      <mat-label>Count</mat-label>
      <input matInput type="number" [(ngModel)]="count" min="1" />
    </mat-form-field>
  </div>

  <div>
    <mat-form-field appearance="fill">
      <mat-label>Until</mat-label>
      <input matInput [matDatepicker]="picker" [(ngModel)]="until" />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  </div>

  <button mat-raised-button color="primary" (click)="generateRRule()">Generate RRule</button>
</div>

@ViewChild(RecurringPatternWidgetComponent) recurringPatternWidget!: RecurringPatternWidgetComponent;
eventRecurrenceRule: string = 'RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=MO;BYSETPOS=1';

onSubmit() {
    // Generate RRULE from recurring pattern widget component
    const recurrenceRule = this.recurringPatternWidget.generateRRule();

    // Assign RRULE to event data
    this.event.recurrenceRule = recurrenceRule;

    // Now you can submit the event data to your backend or further process it
    console.log('Event Data:', this.event);
  }

<app-recurring-pattern-widget [recurrenceRule]="eventRecurrenceRule" #recurringPatternWidget></app-recurring-pattern-widget>
