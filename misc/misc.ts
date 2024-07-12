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
import { RRule, rrulestr, Weekday } from 'rrule';

@Component({
  selector: 'app-recurring-pattern-widget',
  templateUrl: './recurring-pattern-widget.component.html',
  styleUrls: ['./recurring-pattern-widget.component.css']
})
export class RecurringPatternWidgetComponent implements OnInit {
  @Input() recurrenceRule: string | null = null;
  // Input properties
  frequency: string = 'DAILY';
  interval: number = 1;
  dailyOption: string = 'every';
  weeklyInterval: number = 1;
  monthlyOption: string = 'day';
  monthlyInterval: number = 1;
  bymonthday: number = 1;
  bysetpos: number = 1;
  byweekday: Weekday[] = []; // Use Weekday type from rrule
  yearlyOption: string = 'day';
  yearBymonth: number = 1;
  yearByweekday: Weekday = RRule.MO; // Default to Monday
  yearBysetpos: number = 1;
  count: number | null = null;
  until: Date | null = null;

  // Dropdown options
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
      this.byweekday = rule.options.byweekday?.map(day => RRule[day.weekday]) || [];
    } else if (this.frequency === 'WEEKLY') {
      this.weeklyInterval = rule.options.interval;
      this.byweekday = rule.options.byweekday || [];
    } else if (this.frequency === 'MONTHLY') {
      this.monthlyOption = rule.options.bysetpos ? 'weekday' : 'day';
      if (this.monthlyOption === 'day') {
        this.bymonthday = rule.options.bymonthday[0];
      } else {
        this.bysetpos = rule.options.bysetpos[0];
        this.byweekday = rule.options.byweekday?.map(day => RRule[day.weekday]) || [];
      }
      this.monthlyInterval = rule.options.interval;
    } else if (this.frequency === 'YEARLY') {
      this.yearBymonth = rule.options.bymonth[0];
      this.yearlyOption = rule.options.bysetpos ? 'weekday' : 'day';
      if (this.yearlyOption === 'day') {
        this.bymonthday = rule.options.bymonthday[0];
      } else {
        this.yearBysetpos = rule.options.bysetpos[0];
        this.yearByweekday = rule.options.byweekday[0];
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
        options.byweekday = this.byweekday.map(day => day.weekday); // Convert Weekday objects to numbers
      }
    } else if (this.frequency === 'WEEKLY') {
      options.byweekday = this.byweekday;
    } else if (this.frequency === 'MONTHLY') {
      if (this.monthlyOption === 'day') {
        options.bymonthday = this.bymonthday;
      } else if (this.monthlyOption === 'weekday') {
        options.bysetpos = [this.bysetpos];
        options.byweekday = this.byweekday.map(day => day.weekday); // Convert Weekday objects to numbers
      }
    } else if (this.frequency === 'YEARLY') {
      options.bymonth = this.yearBymonth;
      if (this.yearlyOption === 'day') {
        options.bymonthday = this.bymonthday;
      } else if (this.yearlyOption === 'weekday') {
        options.bysetpos = [this.yearBysetpos];
        options.byweekday = [this.yearByweekday.weekday]; // Convert Weekday object to number
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



==================


import { Injectable } from '@angular/core';
import { addMonths, startOfWeek, startOfMonth, addDays, isSameDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class RecurrenceService {
  generateRecurrence(startDate: Date, recurrenceType: string, interval: number, occurrences: number, selectedDays: string[], dayOfMonth?: number): { dates: Date[], rrule: string } {
    let dates: Date[] = [];
    let rrule = '';

    switch (recurrenceType) {
      case 'daily':
        // Implement daily recurrence logic
        break;
      case 'weekly':
        // Implement weekly recurrence logic
        break;
      case 'monthly':
        if (selectedDays.length > 0 && dayOfMonth === undefined) {
          // Monthly weekday logic
          rrule = `FREQ=MONTHLY;INTERVAL=${interval};BYDAY=${selectedDays.join(',')};BYSETPOS=${this.getWeekdayPosition(startDate)}`;
          dates = this.generateMonthlyWeekdayRecurrence(startDate, interval, occurrences, selectedDays);
        } else {
          // Monthly day of month logic
          rrule = `FREQ=MONTHLY;INTERVAL=${interval};BYMONTHDAY=${dayOfMonth}`;
          dates = this.generateMonthlyDayOfMonthRecurrence(startDate, interval, occurrences, dayOfMonth);
        }
        break;
      default:
        break;
    }

    return { dates, rrule };
  }

  private generateMonthlyWeekdayRecurrence(startDate: Date, interval: number, occurrences: number, selectedDays: string[]): Date[] {
    let dates: Date[] = [];
    let currentDate = startDate;
    let count = 0;

    while (count < occurrences) {
      for (let i = 0; i < selectedDays.length; i++) {
        const date = this.findNthWeekdayOfMonth(currentDate, selectedDays[i]);
        if (date) {
          dates.push(date);
          count++;
          if (count >= occurrences) {
            break;
          }
        }
      }
      currentDate = addMonths(currentDate, interval);
    }

    return dates;
  }

  private findNthWeekdayOfMonth(startDate: Date, dayOfWeek: string): Date | undefined {
    const startOfMonthDate = startOfMonth(startDate);
    let currentDate = startOfWeek(startOfMonthDate, { weekStartsOn: 1 }); // Start of the month, Monday-based week
    const dayIndex = this.getWeekdayIndex(dayOfWeek);

    let nthWeekdayCount = 0;

    while (true) {
      if (currentDate.getMonth() !== startDate.getMonth()) {
        break;
      }
      if (currentDate.getDay() === dayIndex) {
        nthWeekdayCount++;
        if (nthWeekdayCount === this.getWeekdayPosition(startDate)) {
          return currentDate;
        }
      }
      currentDate = addDays(currentDate, 1);
    }

    return undefined;
  }

  private getWeekdayPosition(date: Date): number {
    const day = date.getDate();
    const weekDay = date.getDay();
    const week = Math.ceil(day / 7);

    return week;
  }

  private getWeekdayIndex(dayOfWeek: string): number {
    switch (dayOfWeek) {
      case 'sunday':
        return 0;
      case 'monday':
        return 1;
      case 'tuesday':
        return 2;
      case 'wednesday':
        return 3;
      case 'thursday':
        return 4;
      case 'friday':
        return 5;
      case 'saturday':
        return 6;
      default:
        return 0;
    }
  }

  private generateMonthlyDayOfMonthRecurrence(startDate: Date, interval: number, occurrences: number, dayOfMonth: number): Date[] {
    // Implement logic to generate monthly day of month recurrence
    return [];
  }
}



=============


 // Helper method to parse BYDAY value like '2FR' into Weekday object
 private parseByDay(byday: string): Weekday[] {
  const days: Weekday[] = [];
  const parts = byday.match(/^(\d)(\w\w)$/);
  if (parts && parts.length === 3) {
    const setPos = parseInt(parts[1], 10);
    const day = parts[2];
    const weekday = this.getWeekday(day);
    if (weekday) {
      days.push(weekday.nth(setPos));
    }
  }
  return days;
}

// Helper method to map string day to RRule Weekday object
private getWeekday(day: string): Weekday | null {
  switch (day) {
    case 'MO': return RRule.MO;
    case 'TU': return RRule.TU;
    case 'WE': return RRule.WE;
    case 'TH': return RRule.TH;
    case 'FR': return RRule.FR;
    case 'SA': return RRule.SA;
    case 'SU': return RRule.SU;
    default: return null;
  }
}

================

// Helper method to convert setpos from number to string
private convertSetposToString(setpos: number | number[]): string | null {
  const pos = Array.isArray(setpos) ? setpos[0] : setpos;
  if (pos === -1) return 'last';
  const suffix = (pos === 1 || pos === 21 || pos === 31) ? 'st' :
                 (pos === 2 || pos === 22) ? 'nd' :
                 (pos === 3 || pos === 23) ? 'rd' : 'th';
  return pos + suffix;
}

// Helper method to convert setpos from string to number
private convertSetposToNumber(setpos: string): number | null {
  if (setpos === 'last') return -1;
  const match = setpos.match(/^(\d+)(st|nd|rd|th)$/);
  return match ? parseInt(match[1], 10) : null;
}


=============

// Helper method to map day to RRule Weekday object
private getWeekday(day: string | number): Weekday {
  if (typeof day === 'string') {
    switch (day) {
      case 'MO': return RRule.MO;
      case 'TU': return RRule.TU;
      case 'WE': return RRule.WE;
      case 'TH': return RRule.TH;
      case 'FR': return RRule.FR;
      case 'SA': return RRule.SA;
      case 'SU': return RRule.SU;
      default: throw new Error(`Invalid weekday: ${day}`);
    }
  } else if (typeof day === 'number') {
    switch (day) {
      case 0: return RRule.MO;
      case 1: return RRule.TU;
      case 2: return RRule.WE;
      case 3: return RRule.TH;
      case 4: return RRule.FR;
      case 5: return RRule.SA;
      case 6: return RRule.SU;
      default: throw new Error(`Invalid weekday number: ${day}`);
    }
  }
  throw new Error(`Invalid weekday: ${day}`);
}

==============

import com.google.gson.annotations.SerializedName;

public class Schedule {

    private String frequency;
    private int interval;
    private String dailyOption;
    private int weeklyInterval;
    private String monthlyOption;
    private int monthlyInterval;
    private int bymonthday;
    private String bysetpos;
    private String byweekday;
    private String yearlyOption;
    private int yearBymonth;
    private YearByweekday yearByweekday;
    private int yearBysetpos;
    private String rrule;

    // Getters and setters

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public String getDailyOption() {
        return dailyOption;
    }

    public void setDailyOption(String dailyOption) {
        this.dailyOption = dailyOption;
    }

    public int getWeeklyInterval() {
        return weeklyInterval;
    }

    public void setWeeklyInterval(int weeklyInterval) {
        this.weeklyInterval = weeklyInterval;
    }

    public String getMonthlyOption() {
        return monthlyOption;
    }

    public void setMonthlyOption(String monthlyOption) {
        this.monthlyOption = monthlyOption;
    }

    public int getMonthlyInterval() {
        return monthlyInterval;
    }

    public void setMonthlyInterval(int monthlyInterval) {
        this.monthlyInterval = monthlyInterval;
    }

    public int getBymonthday() {
        return bymonthday;
    }

    public void setBymonthday(int bymonthday) {
        this.bymonthday = bymonthday;
    }

    public String getBysetpos() {
        return bysetpos;
    }

    public void setBysetpos(String bysetpos) {
        this.bysetpos = bysetpos;
    }

    public String getByweekday() {
        return byweekday;
    }

    public void setByweekday(String byweekday) {
        this.byweekday = byweekday;
    }

    public String getYearlyOption() {
        return yearlyOption;
    }

    public void setYearlyOption(String yearlyOption) {
        this.yearlyOption = yearlyOption;
    }

    public int getYearBymonth() {
        return yearBymonth;
    }

    public void setYearBymonth(int yearBymonth) {
        this.yearBymonth = yearBymonth;
    }

    public YearByweekday getYearByweekday() {
        return yearByweekday;
    }

    public void setYearByweekday(YearByweekday yearByweekday) {
        this.yearByweekday = yearByweekday;
    }

    public int getYearBysetpos() {
        return yearBysetpos;
    }

    public void setYearBysetpos(int yearBysetpos) {
        this.yearBysetpos = yearBysetpos;
    }

    public String getRrule() {
        return rrule;
    }

    public void setRrule(String rrule) {
        this.rrule = rrule;
    }

    public static class YearByweekday {
        private int weekday;

        // Getter and setter

        public int getWeekday() {
            return weekday;
        }

        public void setWeekday(int weekday) {
            this.weekday = weekday;
        }
    }
}


import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {
        String jsonString = "{ \"frequency\": \"MONTHLY\", \"interval\": 1, \"dailyOption\": \"every\", \"weeklyInterval\": 1, \"monthlyOption\": \"weekday\", \"monthlyInterval\": 3, \"bymonthday\": 1, \"bysetpos\": \"2nd\", \"byweekday\": \"WE\", \"yearlyOption\": \"day\", \"yearBymonth\": 1, \"yearByweekday\": { \"weekday\": 0 }, \"yearBysetpos\": 1, \"rrule\": \"RRULE:FREQ=MONTHLY;INTERVAL=3;BYDAY=+2WE\" }";

        Gson gson = new Gson();
        Schedule schedule = gson.fromJson(jsonString, Schedule.class);

        System.out.println("Frequency: " + schedule.getFrequency());
        System.out.println("Interval: " + schedule.getInterval());
        System.out.println("Daily Option: " + schedule.getDailyOption());
        System.out.println("Weekly Interval: " + schedule.getWeeklyInterval());
        System.out.println("Monthly Option: " + schedule.getMonthlyOption());
        System.out.println("Monthly Interval: " + schedule.getMonthlyInterval());
        System.out.println("Bymonthday: " + schedule.getBymonthday());
        System.out.println("Bysetpos: " + schedule.getBysetpos());
        System.out.println("Byweekday: " + schedule.getByweekday());
        System.out.println("Yearly Option: " + schedule.getYearlyOption());
        System.out.println("Year Bymonth: " + schedule.getYearBymonth());
        System.out.println("Year Byweekday: " + schedule.getYearByweekday().getWeekday());
        System.out.println("Year Bysetpos: " + schedule.getYearBysetpos());
        System.out.println("Rrule: " + schedule.getRrule());
    }
}


========

BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//NONSGML v1.0//EN
BEGIN:VEVENT
UID:1234567890@example.com
DTSTAMP:20240710T090000Z
DTSTART:20240710T090000Z
DTEND:20240710T100000Z
SUMMARY:Weekly Meeting
RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE;UNTIL=20240717T000000Z
END:VEVENT
END:VCALENDAR
