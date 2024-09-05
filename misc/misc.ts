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


=====

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.DayOfWeek;
import java.util.List;
import java.util.Arrays;
import java.util.Collections;

public class NextStartDate {
    public static String getNextStartDate(String startDate, List<DayOfWeek> byDays) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
        LocalDate date = LocalDate.parse(startDate, formatter);

        // Get the current day of the week
        DayOfWeek currentDay = date.getDayOfWeek();

        // Sort byDays to make sure they are in ascending order
        Collections.sort(byDays);

        // Find the next valid day
        DayOfWeek nextDay = byDays.stream()
                                  .filter(day -> day.getValue() > currentDay.getValue())
                                  .findFirst()
                                  .orElse(byDays.get(0)); // If no valid day is found, take the first day of the next week

        // Calculate the days to add
        int daysToAdd = nextDay.getValue() - currentDay.getValue();
        if (daysToAdd <= 0) {
            daysToAdd += 7;
        }

        LocalDate nextStartDate = date.plusDays(daysToAdd);

        // Format the new date as 'MM-dd-yyyy'
        return nextStartDate.format(formatter);
    }

    public static void main(String[] args) {
        String startDate = "07-15-2024";
        List<DayOfWeek> byDays = Arrays.asList(DayOfWeek.THURSDAY, DayOfWeek.FRIDAY);

        System.out.println(getNextStartDate(startDate, byDays));
        // Output: '07-18-2024'
    }
}



===========

<form [formGroup]="form">
  <mat-form-field>
    <mat-label>Select Frequency</mat-label>
    <mat-select formControlName="frequency">
      <mat-option *ngFor="let freq of frequencies" [value]="freq">{{ freq }}</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Interval</mat-label>
    <input matInput type="number" formControlName="interval" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Select Weekdays</mat-label>
    <div *ngFor="let day of weekdays">
      <mat-checkbox (change)="onCheckboxChange($event)" [value]="day">{{ day }}</mat-checkbox>
    </div>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Select Set Position</mat-label>
    <mat-select formControlName="bysetpos">
      <mat-option *ngFor="let pos of setposOptions" [value]="pos">{{ pos }}</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Count</mat-label>
    <input matInput type="number" formControlName="count" />
  </mat-form-field>

  <mat-form-field>
    <mat-label>Until</mat-label>
    <input matInput type="date" formControlName="until" />
  </mat-form-field>
</form>

<!-- Display the next and last occurrence dates -->
<div *ngIf="nextOccurrence">
  <p>Next occurrence: {{ nextOccurrence }}</p>
</div>
<div *ngIf="lastOccurrence">
  <p>Last occurrence: {{ lastOccurrence }}</p>
</div>

<!-- Display an error message if the date range is invalid -->
<div *ngIf="dateRangeError">
  <p style="color: red;">Error: The event start date and end date are not within the valid date range for the recurrence pattern.</p>
</div>


==============

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { RRule, Weekday } from 'rrule';

@Component({
  selector: 'app-recurring-pattern-widget',
  templateUrl: './recurring-pattern-widget.component.html',
  styleUrls: ['./recurring-pattern-widget.component.css']
})
export class RecurringPatternWidgetComponent implements OnInit {
  @Input() rruleStr: string = '';
  @Input() eventStartDate: string = ''; // 'YYYY-MM-DD' format
  @Input() eventEndDate: string = ''; // 'YYYY-MM-DD' format
  
  form: FormGroup;
  frequencies = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];
  weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  setposOptions = ['1st', '2nd', '3rd', '4th', 'last'];

  nextOccurrence: string | null = null; // To store the next occurrence date
  lastOccurrence: string | null = null; // To store the last occurrence date
  dateRangeError: boolean = false; // To indicate if there's an error with the date range

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      frequency: ['DAILY'],
      interval: [1],
      byweekday: this.fb.array([]),
      bysetpos: [null],
      count: [null],
      until: [null],
    });

    this.form.valueChanges.subscribe(() => {
      this.generateRRule();
    });
  }

  ngOnInit() {
    if (this.rruleStr) {
      this.parseRRule(this.rruleStr);
    }
  }

  get byweekday(): FormArray {
    return this.form.get('byweekday') as FormArray;
  }

  onCheckboxChange(event: any) {
    const checkArray: FormArray = this.form.get('byweekday') as FormArray;
    if (event.target.checked) {
      checkArray.push(this.fb.control(event.target.value));
    } else {
      const index = checkArray.controls.findIndex(x => x.value === event.target.value);
      checkArray.removeAt(index);
    }
  }

  generateRRule(): string {
    const formValue = this.form.value;

    const options: any = {
      freq: RRule[formValue.frequency],
      interval: formValue.interval,
    };

    if (formValue.byweekday.length) {
      options.byweekday = formValue.byweekday.map(day => this.getWeekday(day));
    }

    if (formValue.bysetpos !== null) {
      options.bysetpos = this.convertSetposToNumber(formValue.bysetpos);
    }

    if (formValue.count) {
      options.count = formValue.count;
    } else if (formValue.until) {
      options.until = formValue.until;
    }

    const rule = new RRule(options);
    this.calculateNextAndLastOccurrence(rule);
    return rule.toString();
  }

  parseRRule(rruleStr: string) {
    const rule = RRule.fromString(rruleStr);
    this.form.patchValue({
      frequency: RRule.FREQUENCIES[rule.options.freq].toUpperCase(),
      interval: rule.options.interval || 1,
      bysetpos: rule.options.bysetpos ? this.convertSetposToString(rule.options.bysetpos) : null,
      count: rule.options.count || null,
      until: rule.options.until || null
    });

    if (rule.options.byweekday) {
      rule.options.byweekday.forEach((weekday: Weekday) => {
        this.byweekday.push(this.fb.control(this.parseWeekday(weekday)));
      });
    }

    this.calculateNextAndLastOccurrence(rule);
  }

  private convertSetposToString(setpos: number | number[]): string | null {
    const pos = Array.isArray(setpos) ? setpos[0] : setpos;
    if (pos === -1) return 'last';
    const suffix = (pos === 1 || pos === 21 || pos === 31) ? 'st' :
                   (pos === 2 || pos === 22) ? 'nd' :
                   (pos === 3 || pos === 23) ? 'rd' : 'th';
    return pos + suffix;
  }

  private convertSetposToNumber(setpos: string): number | null {
    if (setpos === 'last') return -1;
    const match = setpos.match(/^(\d+)(st|nd|rd|th)$/);
    return match ? parseInt(match[1], 10) : null;
  }

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

  private parseWeekday(weekday: Weekday): string {
    const day = weekday.toString().toUpperCase();
    const nth = weekday.nth();
    return nth ? `${nth}${day}` : day;
  }

  // Calculate the next and last occurrence of the event
  private calculateNextAndLastOccurrence(rule: RRule) {
    const startDate = new Date(this.eventStartDate);
    const endDate = new Date(this.eventEndDate);
    const nextDate = rule.after(startDate, true);
    this.nextOccurrence = nextDate ? nextDate.toISOString().split('T')[0] : null;

    const allOccurrences = rule.between(startDate, endDate, true);
    const lastDate = allOccurrences.length > 0 ? allOccurrences[allOccurrences.length - 1] : null;
    this.lastOccurrence = lastDate ? lastDate.toISOString().split('T')[0] : null;

    // Check if the event start date and event end date fall within the date range
    if (!this.nextOccurrence || !this.lastOccurrence || startDate > endDate) {
      this.dateRangeError = true;
    } else {
      this.dateRangeError = false;
    }
  }
}


===


this.startDateMismatchError = nextDate && (new Date(this.eventStartDate).toISOString().split('T')[0] !== nextDate.toISOString().split('T')[0]);

<div *ngIf="startDateMismatchError">
  <p style="color: red;">Error: The event start date does not match the next occurrence date.</p>
</div>


=======================


function isMatchingDate(date, position, dayOfWeek) {
  const dayMap = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  
  if (!(dayOfWeek in dayMap)) {
    throw new Error('Invalid day of week');
  }
  
  const givenDate = new Date(date);
  const month = givenDate.getMonth();
  const year = givenDate.getFullYear();
  const dayOfWeekIndex = dayMap[dayOfWeek];
  
  let occurrence = 0;
  let currentDate = new Date(year, month, 1);
  let matchingDates = [];
  
  while (currentDate.getMonth() === month) {
    if (currentDate.getDay() === dayOfWeekIndex) {
      matchingDates.push(new Date(currentDate));
      occurrence++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  let targetDate;
  if (position === 'last') {
    targetDate = matchingDates[matchingDates.length - 1];
  } else {
    const targetOccurrence = parseInt(position, 10);
    if (targetOccurrence > occurrence) {
      return false;
    }
    targetDate = matchingDates[targetOccurrence - 1];
  }

  return givenDate.getTime() === targetDate.getTime();
}

// Example usage
const date = '2024-07-25'; // The date to check
const position = '4th'; // Can be '1st', '2nd', '3rd', '4th', or 'last'
const dayOfWeek = 'TH'; // Can be 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'

console.log(isMatchingDate(date, position, dayOfWeek));  // Output: true or false based on the criteria

==================
function isMatchingDate(date, position, dayOfWeek, month) {
  const dayMap = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  
  if (!(dayOfWeek in dayMap)) {
    throw new Error('Invalid day of week');
  }
  
  const givenDate = new Date(date);
  const year = givenDate.getFullYear();
  const monthIndex = month - 1; // Convert month to zero-based index
  const dayOfWeekIndex = dayMap[dayOfWeek];
  
  let occurrence = 0;
  let currentDate = new Date(year, monthIndex, 1);
  let matchingDates = [];
  
  while (currentDate.getMonth() === monthIndex) {
    if (currentDate.getDay() === dayOfWeekIndex) {
      matchingDates.push(new Date(currentDate));
      occurrence++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  let targetDate;
  if (position === 'last') {
    targetDate = matchingDates[matchingDates.length - 1];
  } else {
    const targetOccurrence = parseInt(position, 10);
    if (targetOccurrence > occurrence) {
      return false;
    }
    targetDate = matchingDates[targetOccurrence - 1];
  }

  return givenDate.getTime() === targetDate.getTime();
}

// Example usage
const date = '2024-07-25'; // The date to check
const position = '4th'; // Can be '1st', '2nd', '3rd', '4th', or 'last'
const dayOfWeek = 'TH'; // Can be 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'
const month = 7; // Month as a number (1 for January, 12 for December)

console.log(isMatchingDate(date, position, dayOfWeek, month));  // Output: true or false based on the criteria


=============

function isWithinThreeDays(date) {
  // Create Date objects for the given date and current date
  const givenDate = new Date(date);
  const currentDate = new Date();

  // Reset the time to 00:00:00 for both dates
  givenDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const diffTime = Math.abs(currentDate - givenDate);

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Check if the difference in days is 3 or less
  return diffDays <= 3;
}

// Example usage:
console.log(isWithinThreeDays('2024-07-15')); // Replace with your date to test

========

function isWithinNextThreeDays(date) {
  const givenDate = new Date(date);
  const currentDate = new Date();

  // Get the UTC date for both dates
  const givenDateUTC = Date.UTC(givenDate.getUTCFullYear(), givenDate.getUTCMonth(), givenDate.getUTCDate());
  const currentDateUTC = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate());

  // Calculate the difference in milliseconds
  const diffTime = givenDateUTC - currentDateUTC;

  // Convert milliseconds to days
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // Check if the given date is within the next 3 days (excluding today)
  return diffDays > 0 && diffDays <= 3;
}


=================


function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true; // They are the same object
  }

  if (obj1 == null || typeof obj1 !== 'object' || obj2 == null || typeof obj2 !== 'object') {
    return false; // If either is null or not an object
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false; // Different number of properties
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false; // Different properties or values
    }
  }

  return true; // All properties and values are equal
}

// Example usage:
const obj1 = { name: "John", age: 30 };
const obj2 = { name: "John", age: 30 };
const obj3 = { name: "Jane", age: 25 };

console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(obj1, obj3)); // false

===========================

<mat-form-field>
	<mat-select placeholder="State2" [(ngModel)]="modelGroup" multiple #itemSelect="ngModel">

		<mat-option class="filter-option" disabled="disabled">
			<button mat-button (click)="selectAll(itemSelect)">Seleziona Tutti</button>
			<button mat-button (click)="deselectAll(itemSelect)">Deseleziona Tutti</button>
		</mat-option>

    <!-- Loop through each group via the groups array -->
		<mat-optgroup *ngFor="let group of groups" [label]="group.name">
			<mat-option *ngFor="let item of group.items" [value]="item.value">
				{{item.label}}
			</mat-option>
		</mat-optgroup>
	</mat-select>
</mat-form-field>



groups: any[] = [
  {
    name: 'ETHERNET',
    items: [
      {
        label: "640K",
        value: "BS640KB_ETHERNET",
        defaultValue: true
      },
      {
        label: "7MB",
        value: "BS7MB_ETHERNET",
        defaultValue: true
      },
      {
        label: "7MB NOQinQ",
        value: "BS7MB_ETHERNET_NOQinQ",
        defaultValue: true
      },
      {
        label: "20MB",
        value: "BS20MB_ETHERNET",
        defaultValue: true
      }
    ]
  },
  {
    name: 'ATM',
    items: [
      {
        label: "640K",
        value: "BS640K_ATM",
        defaultValue: true
      },
      {
        label: "7MB",
        value: "BS7M_ATM",
        defaultValue: true
      },
      {
        label: "20MB",
        value: "BS20M_ATM",
        defaultValue: true
      }
    ]
  },
  {
    name: 'ETH',
    items: [
      {
        label: "2MB",
        value: "BS2MB_SHDSL_ETH",
        defaultValue: true
      },
      {
        label: "4MB IMA",
        value: "BS4MB_SHDSL_ETH_IMA",
        defaultValue: true
      },
      {
        label: "6MB IMA",
        value: "BS6MB_SHDSL_ETH_IMA",
        defaultValue: true
      },
      {
        label: "8MB IMA",
        value: "BS8MB_SHDSL_ETH_IMA",
        defaultValue: true
      }
    ]
  },
  {
    name: 'SHDSL ATM',
    items: [
      {
        label: "2MB",
        value: "BS2MB_SHDSL",
        defaultValue: true
      },
      {
        label: "4MB B",
        value: "BS4MB_SHDSL_B",
        defaultValue: true
      },
      {
        label: "4MB IMA",
        value: "BS4MB_SHDSL_IMA",
        defaultValue: true
      },
      {
        label: "6MB IMA",
        value: "BS6MB_SHDSL_IMA",
        defaultValue: true
      },
      {
        label: "8MB IMA",
        value: "BS8MB_SHDSL_IMA",
        defaultValue: true
      }
    ]
  }
];

modelGroup: any[]; // the selected values


selectAll(select: NgModel) {
  let values: any[] = []; // array which will contain all values

  // loop through all groups and add their items' values to the array
  for(let group of this.groups){
    for(let item of group.items){
      values.push(item.value);
    }
  }

  // submit the array with all values
  select.update.emit(values);
}

deselectAll(select: NgModel) {
  select.update.emit([]);
}

=======================
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete-example',
  templateUrl: 'chips-autocomplete-example.html',
  styleUrls: ['chips-autocomplete-example.css'],
})
export class ChipsAutocompleteExample {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // Line of Business
  lobCtrl = new FormControl('');
  filteredLobs: Observable<{ key: string, value: string }[]>;
  selectedLobs: { key: string, value: string }[] = [];
  allLobs: { key: string, value: string }[] = [
    { key: '101', value: 'Finance' },
    { key: '102', value: 'Healthcare' },
    { key: '103', value: 'Education' },
    { key: '104', value: 'Technology' },
    { key: '105', value: 'Retail' }
  ];

  // Regions
  regionCtrl = new FormControl('');
  filteredRegions: Observable<{ key: string, value: string }[]>;
  selectedRegions: { key: string, value: string }[] = [];
  allRegions: { key: string, value: string }[] = [
    { key: '201', value: 'North America' },
    { key: '202', value: 'Europe' },
    { key: '203', value: 'Asia' },
    { key: '204', value: 'South America' },
    { key: '205', value: 'Africa' }
  ];

  selectable = true;
  removable = true;

  @ViewChild('lobInput') lobInput: ElementRef<HTMLInputElement>;
  @ViewChild('regionInput') regionInput: ElementRef<HTMLInputElement>;

  constructor() {
    // Line of Business
    this.filteredLobs = this.lobCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLobs(value || ''))
    );

    // Regions
    this.filteredRegions = this.regionCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRegions(value || ''))
    );
  }

  // Line of Business methods
  addLob(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value) {
      const lob = this.allLobs.find(l => l.value.toLowerCase() === value.toLowerCase());
      if (lob && !this.selectedLobs.includes(lob)) {
        this.selectedLobs.push(lob);
      }
    }

    if (input) {
      input.value = '';
    }

    this.lobCtrl.setValue(null);
  }

  removeLob(lob: { key: string, value: string }): void {
    const index = this.selectedLobs.indexOf(lob);
    if (index >= 0) {
      this.selectedLobs.splice(index, 1);
    }
    this.filterLobs();
  }

  selectedLob(event: MatAutocompleteSelectedEvent): void {
    const lob = event.option.value;
    if (!this.selectedLobs.includes(lob)) {
      this.selectedLobs.push(lob);
    }
    this.lobInput.nativeElement.value = '';
    this.lobCtrl.setValue(null);
    this.filterLobs();
  }

  private _filterLobs(value: string): { key: string, value: string }[] {
    const filterValue = value.toLowerCase();
    return this.allLobs.filter(lob => 
      lob.value.toLowerCase().includes(filterValue) && 
      !this.selectedLobs.includes(lob)
    );
  }

  // Regions methods
  addRegion(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value) {
      const region = this.allRegions.find(r => r.value.toLowerCase() === value.toLowerCase());
      if (region && !this.selectedRegions.includes(region)) {
        this.selectedRegions.push(region);
      }
    }

    if (input) {
      input.value = '';
    }

    this.regionCtrl.setValue(null);
  }

  removeRegion(region: { key: string, value: string }): void {
    const index = this.selectedRegions.indexOf(region);
    if (index >= 0) {
      this.selectedRegions.splice(index, 1);
    }
    this.filterRegions();
  }

  selectedRegion(event: MatAutocompleteSelectedEvent): void {
    const region = event.option.value;
    if (!this.selectedRegions.includes(region)) {
      this.selectedRegions.push(region);
    }
    this.regionInput.nativeElement.value = '';
    this.regionCtrl.setValue(null);
    this.filterRegions();
  }

  private _filterRegions(value: string): { key: string, value: string }[] {
    const filterValue = value.toLowerCase();
    return this.allRegions.filter(region => 
      region.value.toLowerCase().includes(filterValue) && 
      !this.selectedRegions.includes(region)
    );
  }

  private filterLobs() {
    this.filteredLobs = this.lobCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLobs(value || ''))
    );
  }

  private filterRegions() {
    this.filteredRegions = this.regionCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRegions(value || ''))
    );
  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */


    <mat-form-field class="example-chip-list" appearance="fill">
  <mat-chip-list #chipList1>
    <mat-chip
      *ngFor="let lob of selectedLobs"
      [selectable]="selectable"
      [removable]="removable"
      (removed)="removeLob(lob)">
      {{lob.value}}
      <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
    </mat-chip>
    <input
      placeholder="New line of business..."
      #lobInput
      [formControl]="lobCtrl"
      [matAutocomplete]="lobAuto"
      [matChipInputFor]="chipList1"
      [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
      (matChipInputTokenEnd)="addLob($event)">
  </mat-chip-list>
  <mat-autocomplete #lobAuto="matAutocomplete" (optionSelected)="selectedLob($event)">
    <mat-option *ngFor="let lob of filteredLobs | async" [value]="lob">
      {{lob.value}}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>

<mat-form-field class="example-chip-list" appearance="fill">
  <mat-chip-list #chipList2>
    <mat-chip
      *ngFor="let region of selectedRegions"
      [selectable]="selectable"
      [removable]="removable"
      (removed)="removeRegion(region)">
      {{region.value}}
      <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
    </mat-chip>
    <input
      placeholder="New region..."
      #regionInput
      [formControl]="regionCtrl"
      [matAutocomplete]="regionAuto"
      [matChipInputFor]="chipList2"
      [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
      (matChipInputTokenEnd)="addRegion($event)">
  </mat-chip-list>
  <mat-autocomplete #regionAuto="matAutocomplete" (optionSelected)="selectedRegion($event)">
    <mat-option *ngFor="let region of filteredRegions | async" [value]="region">
      {{region.value}}
    </mat-option>
  </mat-autocomplete>
</mat-form-field>

.example-chip-list {
  width: 100%;
}



===============


const { facilitatorForm, learningForm } = data;

const teamMemberDetails = {
  ...learningForm, // Spread the properties of learningForm into teamMemberDetails
  role: facilitatorForm.role, // Add the role from facilitatorForm
  facilitatorDetails: { 
    // Spread the remaining properties from facilitatorForm into facilitatorDetails
    biggestStrength: facilitatorForm.biggestStrength,
    helpTFG: facilitatorForm.helpTFG,
    language: facilitatorForm.language,
    personalAchievement: facilitatorForm.personalAchievement,
    programOffering: facilitatorForm.programOffering
  }
};

console.log(teamMemberDetails);


############################################

export class ParentComponent {
  teamData = [
    { teamName: 'Team A', teamSize: 10, membersEnrolled: 8, teamMembers: 'John, Jane, ...' },
    { teamName: 'Team B', teamSize: 15, membersEnrolled: 12, teamMembers: 'Alice, Bob, ...' },
    // More data here
  ];

  goBack() {
    console.log('Back button clicked');
  }

  goNext() {
    console.log('Next button clicked');
  }
}

<app-codeathon-teams [teams]="teamData" (backAction)="goBack()" (nextAction)="goNext()"></app-codeathon-teams>



import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-codeathon-teams',
  templateUrl: './codeathon-teams.component.html',
  styleUrls: ['./codeathon-teams.component.css']
})
export class CodeathonTeamsComponent {
  @Input() teams: any[] = [];
  @Output() backAction = new EventEmitter<void>();
  @Output() nextAction = new EventEmitter<void>();

  displayedColumns: string[] = ['teamName', 'teamSize', 'membersEnrolled', 'teamMembers', 'action'];
  dataSource = new MatTableDataSource(this.teams);

  constructor(public dialog: MatDialog) {}

  joinTeam(team: any) {
    console.log('Joining team:', team);
  }

  editTeam(team: any) {
    console.log('Editing team:', team);
  }

  deleteTeam(team: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.teams = this.teams.filter(t => t !== team);
        this.dataSource.data = this.teams;
      }
    });
  }

  back() {
    this.backAction.emit();
  }

  next() {
    this.nextAction.emit();
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Confirm Delete</h1>
    <div mat-dialog-content>Are you sure you want to delete this team?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onOk()">Ok</button>
    </div>
  `,
})
export class DeleteConfirmationDialog {
  constructor(private dialogRef: MatDialog) {}

  onCancel() {
    this.dialogRef.close('cancel');
  }

  onOk() {
    this.dialogRef.close('ok');
  }
}


<div class="mat-elevation-z8">
  <table mat-table [dataSource]="dataSource" class="mat-table">

    <!-- Team Name Column -->
    <ng-container matColumnDef="teamName">
      <th mat-header-cell *matHeaderCellDef> Team Name </th>
      <td mat-cell *matCellDef="let element"> {{element.teamName}} </td>
    </ng-container>

    <!-- Team Size Column -->
    <ng-container matColumnDef="teamSize">
      <th mat-header-cell *matHeaderCellDef> Team Size </th>
      <td mat-cell *matCellDef="let element"> {{element.teamSize}} </td>
    </ng-container>

    <!-- Members Enrolled Column -->
    <ng-container matColumnDef="membersEnrolled">
      <th mat-header-cell *matHeaderCellDef> Members Enrolled </th>
      <td mat-cell *matCellDef="let element"> {{element.membersEnrolled}} </td>
    </ng-container>

    <!-- Team Members Column -->
    <ng-container matColumnDef="teamMembers">
      <th mat-header-cell *matHeaderCellDef> Team Members </th>
      <td mat-cell *matCellDef="let element"> {{element.teamMembers}} </td>
    </ng-container>

    <!-- Action Column -->
    <ng-container matColumnDef="action">
      <th mat-header-cell *matHeaderCellDef> Action </th>
      <td mat-cell *matCellDef="let element">
        <button mat-button (click)="joinTeam(element)">Join</button>
        <button mat-button (click)="editTeam(element)">Edit</button>
        <button mat-button (click)="deleteTeam(element)">Delete</button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</div>

<div class="buttons">
  <button mat-button (click)="back()">Back</button>
  <button mat-button (click)="next()">Next</button>
</div>

==========

.locked {
  background-color: #f0f0f0;
  pointer-events: none;
  opacity: 0.6;
}


<div class="mat-elevation-z8">
  <table mat-table [dataSource]="dataSource" class="mat-table">

    <!-- Team Name Column -->
    <ng-container matColumnDef="teamName">
      <th mat-header-cell *matHeaderCellDef> Team Name </th>
      <td mat-cell *matCellDef="let element" [class.locked]="element.lockTeam">
        {{element.teamName}}
      </td>
    </ng-container>

    <!-- Team Size Column -->
    <ng-container matColumnDef="teamSize">
      <th mat-header-cell *matHeaderCellDef> Team Size </th>
      <td mat-cell *matCellDef="let element" [class.locked]="element.lockTeam">
        {{element.teamSize}}
      </td>
    </ng-container>

    <!-- Members Enrolled Column -->
    <ng-container matColumnDef="membersEnrolled">
      <th mat-header-cell *matHeaderCellDef> Members Enrolled </th>
      <td mat-cell *matCellDef="let element" [class.locked]="element.lockTeam">
        {{element.membersEnrolled}}
      </td>
    </ng-container>

    <!-- Team Members Column -->
    <ng-container matColumnDef="teamMembers">
      <th mat-header-cell *matHeaderCellDef> Team Members </th>
      <td mat-cell *matCellDef="let element" [class.locked]="element.lockTeam">
        {{element.teamMembers}}
      </td>
    </ng-container>

    <!-- Action Column -->
    <ng-container matColumnDef="action">
      <th mat-header-cell *matHeaderCellDef> Action </th>
      <td mat-cell *matCellDef="let element" [class.locked]="element.lockTeam">
        <button mat-button (click)="joinTeam(element)" [disabled]="element.lockTeam">Join</button>
        <button mat-button (click)="editTeam(element)" [disabled]="element.lockTeam">Edit</button>
        <button mat-button (click)="deleteTeam(element)" [disabled]="element.lockTeam">Delete</button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;" [class.locked]="row.lockTeam"></tr>
  </table>
</div>

<div class="buttons">
  <button mat-button (click)="back()">Back</button>
  <button mat-button (click)="next()">Next</button>
</div>


teamData = [
  { teamName: 'Team A', teamSize: 10, membersEnrolled: 8, teamMembers: 'John, Jane, ...', lockTeam: false },
  { teamName: 'Team B', teamSize: 15, membersEnrolled: 12, teamMembers: 'Alice, Bob, ...', lockTeam: true },
  // More data here
];



=============

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-codeathon-teams',
  templateUrl: './codeathon-teams.component.html',
  styleUrls: ['./codeathon-teams.component.css']
})
export class CodeathonTeamsComponent {
  @Input() teams: any[] = [];
  @Output() backAction = new EventEmitter<void>();
  @Output() nextAction = new EventEmitter<void>();

  displayedColumns: string[] = ['teamName', 'teamSize', 'membersEnrolled', 'teamMembers', 'action'];
  dataSource = new MatTableDataSource(this.teams);

  constructor(public dialog: MatDialog) {}

  joinTeam(team: any) {
    console.log('Joining team:', team);
  }

  editTeam(team: any) {
    console.log('Editing team:', team);
  }

  deleteTeam(team: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.teams = this.teams.filter(t => t !== team);
        this.dataSource.data = this.teams;
      }
    });
  }

  back() {
    this.backAction.emit();
  }

  next() {
    this.nextAction.emit();
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Confirm Delete</h1>
    <div mat-dialog-content>Are you sure you want to delete this team?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onOk()">Ok</button>
    </div>
  `,
})
export class DeleteConfirmationDialog {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}

  onCancel() {
    this.dialogRef.close('cancel');
  }

  onOk() {
    this.dialogRef.close('ok');
  }
}


//////////////////////

(keyup)="onNumberTypeKeyUp($event)"

onNumberTypeKeyUp(event: KeyboardEvent): void {
  const inputElement = event.target as HTMLInputElement;
  const charCode = event.which || event.keyCode;

  // Allow only digits (0-9), backspace, delete, left arrow, and right arrow
  if ((charCode < 48 || charCode > 57) && charCode !== 8 && charCode !== 46 && charCode !== 37 && charCode !== 39) {
    // Remove the last character if it's not a valid digit
    this.inputValue = inputElement.value.slice(0, -1);
  } else {
    this.inputValue = inputElement.value;
  }

  // Update the input field with the cleaned value
  inputElement.value = this.inputValue;
}


=========
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-codeathon-teams-manage',
  templateUrl: './codeathon-teams-manage.component.html',
  styleUrls: ['./codeathon-teams-manage.component.css']
})
export class CodeathonTeamsManageComponent implements OnInit {
  @Input() teamData: any;
  @Input() mode: 'create' | 'edit' = 'create';

  teamForm: FormGroup;
  teamMembers: string[] = [];
  allMembers: string[] = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  filteredMembers: string[] = this.allMembers;

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      lockTeam: [false],
      teamMembers: [this.teamMembers]
    });
  }

  ngOnInit() {
    if (this.teamData && this.mode === 'edit') {
      this.teamForm.patchValue({
        teamName: this.teamData.teamName,
        lockTeam: this.teamData.lockTeam,
        teamMembers: this.teamData.teamMembers
      });
      this.teamMembers = [...this.teamData.teamMembers];
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && this.teamMembers.indexOf(value) === -1) {
      this.teamMembers.push(value);
    }
    event.chipInput!.clear();
    this.teamForm.controls['teamMembers'].setValue(this.teamMembers);
  }

  remove(member: string): void {
    const index = this.teamMembers.indexOf(member);
    if (index >= 0) {
      this.teamMembers.splice(index, 1);
      this.teamForm.controls['teamMembers'].setValue(this.teamMembers);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.teamMembers.indexOf(event.option.viewValue) === -1) {
      this.teamMembers.push(event.option.viewValue);
      this.teamForm.controls['teamMembers'].setValue(this.teamMembers);
    }
  }

  submit() {
    if (this.teamForm.valid) {
      console.log('Team Data:', this.teamForm.value);
      // Add logic to handle form submission
    }
  }

  filterMembers(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allMembers.filter(member => member.toLowerCase().includes(filterValue));
  }
}



<form [formGroup]="teamForm" (ngSubmit)="submit()">
  <mat-form-field appearance="fill">
    <mat-label>Team Name</mat-label>
    <input matInput formControlName="teamName" placeholder="Enter team name">
    <mat-error *ngIf="teamForm.controls['teamName'].hasError('required')">
      Team Name is required
    </mat-error>
  </mat-form-field>

  <mat-slide-toggle formControlName="lockTeam">Locked</mat-slide-toggle>

  <mat-form-field appearance="fill">
    <mat-label>Team Members</mat-label>
    <mat-chip-list #chipList aria-label="Team Members">
      <mat-chip *ngFor="let member of teamMembers" [selectable]="selectable" [removable]="removable"
                (removed)="remove(member)">
        {{member}}
        <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
      </mat-chip>
      <input
        placeholder="Add member"
        [matChipInputFor]="chipList"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        [matChipInputAddOnBlur]="true"
        (matChipInputTokenEnd)="add($event)"
        [matAutocomplete]="auto">
    </mat-chip-list>
    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
      <mat-option *ngFor="let member of filteredMembers" [value]="member">
        {{member}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>

  <button mat-raised-button color="primary" type="submit">Submit</button>
</form>




<!-- Manage Team Section -->
<app-codeathon-teams-manage
  *ngIf="mode !== 'create' || selectedTeamData"
  [teamData]="selectedTeamData"
  [mode]="mode">
</app-codeathon-teams-manage>



=====


<form (ngSubmit)="submit()">
  <mat-form-field appearance="fill">
    <mat-label>Team Name</mat-label>
    <input matInput [formControl]="teamName" placeholder="Enter team name">
    <mat-error *ngIf="teamName.hasError('required')">
      Team Name is required
    </mat-error>
  </mat-form-field>

  <mat-slide-toggle [formControl]="lockTeam">Locked</mat-slide-toggle>

  <mat-form-field appearance="fill">
    <mat-label>Team Members</mat-label>
    <mat-chip-list #chipList aria-label="Team Members">
      <mat-chip *ngFor="let member of teamMembers" [selectable]="selectable" [removable]="removable"
                (removed)="remove(member)">
        {{member.name}}
        <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
      </mat-chip>
      <input
        placeholder="Select member"
        [matChipInputFor]="chipList"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        [matChipInputAddOnBlur]="false"
        [formControl]="teamMemberInput"
        [matAutocomplete]="auto"
        #teamMemberInputRef>  <!-- Template reference added -->
    </mat-chip-list>
    <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
      <mat-option *ngFor="let member of filteredMembers | async" [value]="member.name">
        {{member.name}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>

  <button mat-raised-button color="primary" type="submit">Submit</button>
</form>



import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface TeamMember {
  id: number;
  name: string;
}

@Component({
  selector: 'app-codeathon-teams-manage',
  templateUrl: './codeathon-teams-manage.component.html',
  styleUrls: ['./codeathon-teams-manage.component.css']
})
export class CodeathonTeamsManageComponent implements OnInit {
  @Input() teamData: any;
  @Input() mode: 'create' | 'edit' = 'create';

  teamName = new FormControl('');
  lockTeam = new FormControl(false);
  teamMemberInput = new FormControl('');
  teamMembers: TeamMember[] = [];
  allMembers: TeamMember[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Alice' },
    { id: 4, name: 'Bob' },
    { id: 5, name: 'Charlie' }
  ];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  filteredMembers: Observable<TeamMember[]>;

  @ViewChild('teamMemberInputRef') teamMemberInputRef: ElementRef<HTMLInputElement>;  // Reference to the input element

  constructor() {}

  ngOnInit() {
    if (this.teamData && this.mode === 'edit') {
      this.teamName.setValue(this.teamData.teamName);
      this.lockTeam.setValue(this.teamData.lockTeam);
      this.teamMembers = [...this.teamData.teamMembers];
    }

    this.updateFilteredMembers();
  }

  updateFilteredMembers(): void {
    this.filteredMembers = this.teamMemberInput.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || ''))
    );
  }

  private filter(value: string): TeamMember[] {
    const filterValue = value.toLowerCase();
    return this.allMembers.filter(member =>
      member.name.toLowerCase().includes(filterValue) &&
      !this.teamMembers.find(m => m.id === member.id)
    );
  }

  remove(member: TeamMember): void {
    const index = this.teamMembers.indexOf(member);
    if (index >= 0) {
      this.teamMembers.splice(index, 1);
      this.updateFilteredMembers();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedMember = this.allMembers.find(member => member.name === event.option.viewValue);
    if (selectedMember && !this.teamMembers.find(m => m.id === selectedMember.id)) {
      this.teamMembers.push(selectedMember);
      this.teamMemberInput.setValue('');  // Clear FormControl value
      this.teamMemberInputRef.nativeElement.value = '';  // Clear the native element value
      this.updateFilteredMembers();
    }
  }

  submit() {
    if (this.teamName.valid) {
      const teamData = {
        teamName: this.teamName.value,
        lockTeam: this.lockTeam.value,
        teamMembers: this.teamMembers
      };
      console.log('Team Data:', teamData);
      // Add logic to handle form submission
    }
  }
}


==============

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-icon-cell-renderer',
  template: `
    <div class="icon-cell">
      <i class="material-icons" (click)="onIconClick()">edit</i>
    </div>
  `,
  styles: [`
    .icon-cell {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    i.material-icons {
      cursor: pointer;
      color: #1976d2; /* Change color as needed */
    }
  `]
})
export class IconCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  onIconClick(): void {
    if (this.params.onClick) {
      this.params.onClick(this.params.data);
    }
  }
}



@Component({
  selector: 'app-my-grid',
  template: `
    <ag-grid-angular
      style="width: 100%; height: 500px;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [frameworkComponents]="frameworkComponents">
    </ag-grid-angular>
  `
})
export class MyGridComponent {
  rowData = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    {
      headerName: 'Actions',
      cellRenderer: 'iconCellRenderer',
      cellRendererParams: {
        onClick: this.onEditButtonClick.bind(this)
      }
    }
  ];

  frameworkComponents = {
    iconCellRenderer: IconCellRendererComponent
  };

  onEditButtonClick(data: any): void {
    console.log('Edit button clicked for:', data);
    // Add your logic here
  }
}


====================

<mat-accordion>

  <!-- Dashboard Section -->
  <mat-accordion>

  <!-- Dashboard Section -->
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title> Dashboard </mat-panel-title>
    </mat-expansion-panel-header>
    <div class="dashboard-grid">
      <!-- Row 1: Labels -->
      <div class="grid-item label">Next Event</div>
      <div class="grid-item label">Upcoming Events (Next 30 Days)</div>
      <div class="grid-item label">Upcoming Events (Next 90 Days)</div>
      <div class="grid-item label">Completed Events (Since 2023)</div>
      <div class="grid-item label">Available Events (Next 90 Days)</div>
      
      <!-- Row 2: Data -->
      <div class="grid-item">{{nextEvent?.name}}</div>
      <div class="grid-item">{{upcomingEvents30Days}}</div>
      <div class="grid-item">{{upcomingEvents90Days}}</div>
      <div class="grid-item">{{completedEventsSince2023}}</div>
      <div class="grid-item">{{availableEvents90Days}}</div>

      <!-- Row 3: Date/Info -->
      <div class="grid-item">{{nextEvent?.date | date: 'MMMM d'}}</div>
      <div class="grid-item">Next 30 Days</div>
      <div class="grid-item">Next 90 Days</div>
      <div class="grid-item">Since 2023</div>
      <div class="grid-item">Next 90 Days</div>
    </div>
  </mat-expansion-panel>

  <!-- Other sections remain the same -->
</mat-accordion>


  <!-- Events Table Section -->
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title> Events Table </mat-panel-title>
    </mat-expansion-panel-header>
    <div class="events-table-section">
      <table mat-table [dataSource]="eventData" class="mat-elevation-z8">
        <ng-container matColumnDef="eventName">
          <th mat-header-cell *matHeaderCellDef> Event Name </th>
          <td mat-cell *matCellDef="let event"> {{event.name}} </td>
        </ng-container>

        <ng-container matColumnDef="eventType">
          <th mat-header-cell *matHeaderCellDef> Event Type </th>
          <td mat-cell *matCellDef="let event"> {{event.type}} </td>
        </ng-container>

        <ng-container matColumnDef="eventDateTime">
          <th mat-header-cell *matHeaderCellDef> Event Date-Time </th>
          <td mat-cell *matCellDef="let event"> {{event.dateTime | date:'short'}} </td>
        </ng-container>

        <ng-container matColumnDef="registered">
          <th mat-header-cell *matHeaderCellDef> Registered </th>
          <td mat-cell *matCellDef="let event"> {{event.registered}} </td>
        </ng-container>

        <ng-container matColumnDef="availableSpaces">
          <th mat-header-cell *matHeaderCellDef> Available Spaces </th>
          <td mat-cell *matCellDef="let event"> {{event.availableSpaces}} </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef> Action </th>
          <td mat-cell *matCellDef="let event">
            <button mat-button color="primary">Register</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  </mat-expansion-panel>

  <!-- Charts Section -->
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title> Charts </mat-panel-title>
    </mat-expansion-panel-header>
    <div class="charts-section">
      <!-- Insert your chart component here -->
      <app-event-chart [data]="eventData"></app-event-chart>
    </div>
  </mat-expansion-panel>

</mat-accordion>



import { Component, OnInit } from '@angular/core';

interface EventData {
  name: string;
  type: string;
  dateTime: Date;
  registered: number;
  availableSpaces: number;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userName = 'John Doe';
  nextEvent?: EventData;
  upcomingEvents30Days = 5;
  upcomingEvents90Days = 12;
  completedEventsSince2023 = 15;
  availableEvents90Days = 7;

  eventData: EventData[] = [
    { name: 'Event 1', type: 'Conference', dateTime: new Date(), registered: 10, availableSpaces: 5 },
    { name: 'Event 2', type: 'Workshop', dateTime: new Date(), registered: 8, availableSpaces: 10 }
  ];

  displayedColumns: string[] = ['eventName', 'eventType', 'eventDateTime', 'registered', 'availableSpaces', 'action'];

  ngOnInit() {
    this.nextEvent = this.eventData[0];
  }
}


.dashboard-section,
.events-table-section,
.charts-section {
  margin: 10px 0;
}

mat-expansion-panel {
  margin-bottom: 10px;
}

mat-table {
  width: 100%;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  text-align: center;
  padding: 10px;

  .grid-item {
    padding: 8px;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .label {
    font-weight: bold;
    background: transparent;
  }
}

================

.dashboard-card {
  margin-bottom: 20px;
  padding: 20px;
}

.dashboard-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.dashboard-header {
  flex: 1;
  text-align: left;
}

.dashboard-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  flex: 3;
}

.dashboard-box {
  flex: 1 1 150px;
  min-width: 150px;
  text-align: center;
  padding: 10px;
}



<mat-card class="dashboard-card">
  <mat-card-content>
    <div class="dashboard-container">
      <!-- Welcome Message -->
      <div class="dashboard-header">
        <h2>Welcome user, Dave!</h2>
      </div>

      <!-- Event Information Boxes -->
      <div class="dashboard-content">
        <!-- Next Event Box -->
        <mat-card class="dashboard-box">
          <mat-card-title>Next Event</mat-card-title>
          <mat-card-content>
            <div>{{nextEvent?.name}}</div>
            <div>{{nextEvent?.date | date: 'MMMM d, y'}}</div>
          </mat-card-content>
        </mat-card>

        <!-- Upcoming Events (Next 30 Days) Box -->
        <mat-card class="dashboard-box">
          <mat-card-title>Upcoming Events (Next 30 Days)</mat-card-title>
          <mat-card-content>
            <div>{{upcomingEvents30Days}}</div>
          </mat-card-content>
        </mat-card>

        <!-- Upcoming Events (Next 90 Days) Box -->
        <mat-card class="dashboard-box">
          <mat-card-title>Upcoming Events (Next 90 Days)</mat-card-title>
          <mat-card-content>
            <div>{{upcomingEvents90Days}}</div>
          </mat-card-content>
        </mat-card>

        <!-- Completed Events (Since 2023) Box -->
        <mat-card class="dashboard-box">
          <mat-card-title>Completed Events (Since 2023)</mat-card-title>
          <mat-card-content>
            <div>{{completedEventsSince2023}}</div>
          </mat-card-content>
        </mat-card>

        <!-- Available Events (Next 90 Days) Box -->
        <mat-card class="dashboard-box">
          <mat-card-title>Available Events (Next 90 Days)</mat-card-title>
          <mat-card-content>
            <div>{{availableEvents90Days}}</div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  </mat-card-content>
</mat-card>





=============


function getEventDetails(eventList) {
  const currentDate = new Date();
  const startDate = new Date('2023-01-01');
  
  // Calculate the dates for the next 30 and 90 days
  const next30DaysDate = new Date(currentDate);
  next30DaysDate.setDate(currentDate.getDate() + 30);
  
  const next90DaysDate = new Date(currentDate);
  next90DaysDate.setDate(currentDate.getDate() + 90);
  
  // Filter events for the next 30 and 90 days
  const upcomingEvents30Days = eventList.filter(event => {
    const eventDate = new Date(event.eventStartDate);
    return eventDate >= currentDate && eventDate <= next30DaysDate;
  });

  const upcomingEvents90Days = eventList.filter(event => {
    const eventDate = new Date(event.eventStartDate);
    return eventDate >= currentDate && eventDate <= next90DaysDate;
  });

  // Find the next upcoming event
  const nextUpcomingEvent = eventList
    .filter(event => new Date(event.eventStartDate) >= currentDate)
    .sort((a, b) => new Date(a.eventStartDate) - new Date(b.eventStartDate))[0];

  // Filter completed events since 2023-01-01
  const completedEvents = eventList.filter(event => {
    const eventDate = new Date(event.eventStartDate);
    return eventDate >= startDate && eventDate < currentDate;
  });

  return {
    upcomingEvents30Days,
    upcomingEvents90Days,
    nextUpcomingEvent,
    completedEvents
  };
}

// Example usage
const eventList = [
  { eventName: "Event 1", eventStartDate: "2024-09-10" },
  { eventName: "Event 2", eventStartDate: "2024-10-05" },
  { eventName: "Event 3", eventStartDate: "2024-11-20" },
  { eventName: "Event 4", eventStartDate: "2024-08-29" },
  { eventName: "Event 5", eventStartDate: "2023-02-15" },
  { eventName: "Event 6", eventStartDate: "2023-12-31" }
];

const eventDetails = getEventDetails(eventList);

console.log("Upcoming Events in Next 30 Days:", eventDetails.upcomingEvents30Days);
console.log("Upcoming Events in Next 90 Days:", eventDetails.upcomingEvents90Days);
console.log("Next Upcoming Event:", eventDetails.nextUpcomingEvent);
console.log("Completed Events since 2023-01-01:", eventDetails.completedEvents);

/********************************************************** */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leads-dashboard',
  templateUrl: './leads-dashboard.component.html',
  styleUrls: ['./leads-dashboard.component.scss']
})
export class LeadsDashboardComponent implements OnInit {
  region: string = 'all'; // Default region selection

  metrics = {
    all: {
      mostRegisteredEventType: { eventId: 1, title: 'Conference' },
      mostVisits: { date: '2023-08-15', numberOfVisits: 200 },
      mostAttendedEventType: { eventId: 2, title: 'Workshop' },
      mostRegistrations: { date: '2023-08-10', numberOfRegistrations: 150 },
      eventMetrics: [
        { label: 'Visits Yesterday', count: 300, isIncrease: true, percentageChange: 10 },
        { label: 'Visits MTD', count: 1200, isIncrease: false, percentageChange: -5 },
        { label: 'Visits Last Month', count: 2500, isIncrease: true, percentageChange: 15 },
        { label: 'Events MTD', count: 50, isIncrease: true, percentageChange: 8 },
        { label: 'Events Last Month', count: 45, isIncrease: false, percentageChange: -3 },
        { label: 'Return % Last Month', count: 70, isIncrease: true, percentageChange: 12 }
      ],
      registrationMetrics: [
        { label: 'Registrations Yesterday', count: 150, isIncrease: true, percentageChange: 12 },
        { label: 'Registrations MTD', count: 800, isIncrease: true, percentageChange: 6 },
        { label: 'Registrations Last Month', count: 700, isIncrease: false, percentageChange: -4 }
      ]
    },
    east: {
      mostRegisteredEventType: { eventId: 3, title: 'Seminar' },
      mostVisits: { date: '2023-08-20', numberOfVisits: 150 },
      mostAttendedEventType: { eventId: 4, title: 'Training' },
      mostRegistrations: { date: '2023-08-18', numberOfRegistrations: 100 },
      eventMetrics: [
        { label: 'Visits Yesterday', count: 100, isIncrease: false, percentageChange: -5 },
        { label: 'Visits MTD', count: 500, isIncrease: true, percentageChange: 7 },
        { label: 'Visits Last Month', count: 1800, isIncrease: true, percentageChange: 20 },
        { label: 'Events MTD', count: 30, isIncrease: false, percentageChange: -2 },
        { label: 'Events Last Month', count: 25, isIncrease: true, percentageChange: 5 },
        { label: 'Return % Last Month', count: 65, isIncrease: false, percentageChange: -3 }
      ],
      registrationMetrics: [
        { label: 'Registrations Yesterday', count: 100, isIncrease: false, percentageChange: -3 },
        { label: 'Registrations MTD', count: 400, isIncrease: true, percentageChange: 4 },
        { label: 'Registrations Last Month', count: 380, isIncrease: false, percentageChange: -2 }
      ]
    },
    west: {
      mostRegisteredEventType: { eventId: 5, title: 'Webinar' },
      mostVisits: { date: '2023-08-10', numberOfVisits: 250 },
      mostAttendedEventType: { eventId: 6, title: 'Panel Discussion' },
      mostRegistrations: { date: '2023-08-05', numberOfRegistrations: 130 },
      eventMetrics: [
        { label: 'Visits Yesterday', count: 200, isIncrease: true, percentageChange: 5 },
        { label: 'Visits MTD', count: 900, isIncrease: false, percentageChange: -3 },
        { label: 'Visits Last Month', count: 2200, isIncrease: false, percentageChange: -10 },
        { label: 'Events MTD', count: 20, isIncrease: true, percentageChange: 12 },
        { label: 'Events Last Month', count: 15, isIncrease: false, percentageChange: -8 },
        { label: 'Return % Last Month', count: 72, isIncrease: true, percentageChange: 15 }
      ],
      registrationMetrics: [
        { label: 'Registrations Yesterday', count: 120, isIncrease: true, percentageChange: 8 },
        { label: 'Registrations MTD', count: 400, isIncrease: false, percentageChange: -6 },
        { label: 'Registrations Last Month', count: 320, isIncrease: false, percentageChange: -5 }
      ]
    }
  };

  // Table data
  tableData = [
    { region: 'East', chapter: 'Chapter A', eventType: 'Conference' },
    { region: 'West', chapter: 'Chapter B', eventType: 'Workshop' }
  ];

  displayedColumns: string[] = ['region', 'chapter', 'eventType'];

  chartData = {}; // Data to be used in the chart

  filteredMetrics: any = this.metrics.all; // Default filtered metrics

  constructor() {}

  ngOnInit(): void {}

  onRegionChange(region: string) {
    this.region = region;
    this.filteredMetrics = this.metrics[region];
  }

  // Handle click events for registration metrics
  onRegistrationMetricClick(metric: any) {
    // Display the data table and graph based on the selected registration metric
    console.log(`Displaying table and chart for ${metric.label}`);
  }
}



<div>
  <!-- Region Selection -->
  <mat-radio-group [(ngModel)]="region" (change)="onRegionChange(region)">
    <mat-radio-button value="all">All</mat-radio-button>
    <mat-radio-button value="east">East</mat-radio-button>
    <mat-radio-button value="west">West</mat-radio-button>
  </mat-radio-group>

  <!-- Dashboard Section -->
  <div fxLayout="row" fxLayoutWrap="wrap" fxLayoutGap="16px">
    <h2>Welcome back, John!</h2>
    <div fxLayout="row" fxLayoutGap="16px" fxFlex="100%">
      <!-- Event Metrics -->
      <mat-card *ngFor="let metric of filteredMetrics.eventMetrics" fxFlex="24%">
        <h3>{{ metric.label }}</h3>
        <div>
          <span>{{ metric.count }}%</span>
          <span [ngClass]="{'up': metric.isIncrease, 'down': !metric.isIncrease}">
            <mat-icon>{{ metric.isIncrease ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
            {{ metric.percentageChange }}%
          </span>
        </div>
      </mat-card>
    </div>
  </div>

  <!-- Registration Metrics -->
  <div fxLayout="row" fxLayoutWrap="wrap" fxLayoutGap="16px" fxFlex="100%">
    <div fxLayout="row" fxLayoutGap="16px" fxFlex="100%">
      <mat-card *ngFor="let metric of filteredMetrics.registrationMetrics" fxFlex="24%">
        <h3>{{ metric.label }}</h3>
        <div>
          <span>{{ metric.count }}</span>
          <span [ngClass]="{'up': metric.isIncrease, 'down': !metric.isIncrease}">
            <mat-icon>{{ metric.isIncrease ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
            {{ metric.percentageChange }}%
          </span>
        </div>
      </mat-card>
    </div>
  </div>

  <!-- Accordion for Table -->
  <mat-accordion>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>Event Table</mat-panel-title>
      </mat-expansion-panel-header>
      <mat-card>
      <table mat-table [dataSource]="tableData" class="mat-elevation-z8">
      <ng-container matColumnDef="region">
        <th mat-header-cell *matHeaderCellDef> Region </th>
        <td mat-cell *matCellDef="let element"> {{element.region}} </td>
      </ng-container>
      <!-- Other columns for Chapter, EventType -->
      <ng-container matColumnDef="chapter">
        <th mat-header-cell *matHeaderCellDef> Chapter </th>
        <td mat-cell *matCellDef="let element"> {{element.chapter}} </td>
      </ng-container>
      <ng-container matColumnDef="eventType">
        <th mat-header-cell *matHeaderCellDef> Event Type </th>
        <td mat-cell *matCellDef="let element"> {{element.eventType}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
      </mat-card>
    </mat-expansion-panel>

    // <mat-expansion-panel>
    //   <mat-expansion-panel-header>
    //     <mat-panel-title>Event Chart</mat-panel-title>
    //   </mat-expansion-panel-header>
    //   <mat-card>
    //   </mat-card>
    // </mat-expansion-panel>
  </mat-accordion>
</div>



.up {
  color: green;
}

.down {
  color: red;
}

mat-card {
  padding: 16px;
  text-align: center;
}



<mat-accordion>
  <!-- Region Selection Radio Buttons -->
  <mat-card>
    <mat-radio-group [(ngModel)]="region" (change)="onRegionChange($event)">
      <mat-radio-button value="all">All</mat-radio-button>
      <mat-radio-button value="east">East</mat-radio-button>
      <mat-radio-button value="west">West</mat-radio-button>
    </mat-radio-group>
  </mat-card>

  <!-- Dashboard Section -->
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Dashboard</mat-panel-title>
    </mat-expansion-panel-header>
    <mat-card>
      <!-- Section 1: Event Metrics -->
      <h2>Welcome back, John!</h2>
      <div fxLayout="row" fxLayoutGap="16px">
        <mat-card>
          <h3>Most Registered Event Type (last 90 days)</h3>
          <p>{{ filteredMetrics.mostRegisteredEventType.title }}</p>
        </mat-card>
        <mat-card>
          <h3>Most Visits (last 90 days)</h3>
          <p>{{ filteredMetrics.mostVisits.numberOfVisits }}</p>
        </mat-card>
      </div>
      <div fxLayout="row" fxLayoutGap="16px">
        <mat-card>
          <h3>Most Attended Event Type (last 90 days)</h3>
          <p>{{ filteredMetrics.mostAttendedEventType.title }}</p>
        </mat-card>
        <mat-card>
          <h3>Most Registrations (last 90 days)</h3>
          <p>{{ filteredMetrics.mostRegistrations.numberOfRegistrations }}</p>
        </mat-card>
      </div>

      <!-- Section 2: Visit & Registration Metrics -->
      <div fxLayout="row" fxLayoutWrap="wrap" fxLayoutGap="16px">
        <mat-card *ngFor="let metric of filteredMetrics.visitMetrics">
          <h3>{{ metric.label }}</h3>
          <div>
            <span>{{ metric.count }}</span>
            <span [ngClass]="{'up': metric.isIncrease, 'down': !metric.isIncrease}">
              <mat-icon>{{ metric.isIncrease ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
              {{ metric.percentageChange }}%
            </span>
          </div>
        </mat-card>
      </div>

      <!-- Registration Metrics -->
    <div fxLayout="row" fxLayoutWrap="wrap" fxLayoutGap="16px" fxFlex="100%">
      <div fxLayout="row" fxLayoutGap="16px" fxFlex="100%">
        <mat-card *ngFor="let metric of filteredMetrics.registrationMetrics" fxFlex="24%">
          <h3>{{ metric.label }}</h3>
          <div>
            <span>{{ metric.count }}</span>
            <span [ngClass]="{'up': metric.isIncrease, 'down': !metric.isIncrease}">
              <mat-icon>{{ metric.isIncrease ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
              {{ metric.percentageChange }}%
            </span>
          </div>
        </mat-card>
      </div>
    </div>
    </mat-card>
  </mat-expansion-panel>

  <!-- Table Section -->
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Event Data Table</mat-panel-title>
    </mat-expansion-panel-header>
    <mat-card>
      <table mat-table [dataSource]="tableData" class="mat-elevation-z8">
        <ng-container matColumnDef="region">
          <th mat-header-cell *matHeaderCellDef> Region </th>
          <td mat-cell *matCellDef="let element"> {{element.region}} </td>
        </ng-container>
        <!-- Other columns -->
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  </mat-expansion-panel>

  <!-- Chart Section -->
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Charts</mat-panel-title>
    </mat-expansion-panel-header>
    <mat-card>
      <app-chart [data]="chartData"></app-chart> <!-- Custom chart component -->
    </mat-card>
  </mat-expansion-panel>
</mat-accordion>
