import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-duration',
  templateUrl: './time-duration.component.html',
  styleUrls: ['./time-duration.component.scss']
})
export class TimeDurationComponent {
  timeIntervals: string[] = [];
  durationOptions: string[] = [
    "5 minutes", "10 minutes", "15 minutes", "30 minutes", 
    "1 hour", "2 hours", "3 hours", "4 hours", "5 hours",
    "6 hours", "7 hours", "8 hours", "9 hours", "10 hours",
    "11 hours", "0.5 days", "18 hours"
  ];
  
  startTime = new FormControl('');
  endTime = new FormControl('');
  duration = new FormControl('');
  durationDropdownOpen = false;

  constructor() {
    this.generateTimeSlots();
  }

  // Generate 15-minute time slots in "hh:mm:ss A" format
  generateTimeSlots() {
    const times: string[] = [];
    let start = new Date();
    start.setHours(0, 0, 0, 0); // Midnight

    for (let i = 0; i < 96; i++) { // 96 intervals of 15 mins in 24 hrs
      const hours = start.getHours();
      const minutes = start.getMinutes();
      const formattedTime = `${this.formatTime(hours)}:${this.formatTime(minutes)}:00 ${hours >= 12 ? 'PM' : 'AM'}`;
      times.push(formattedTime);
      start.setMinutes(start.getMinutes() + 15);
    }
    
    this.timeIntervals = times;
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Convert time string "hh:mm:ss A" to minutes
  convertToMinutes(time: string): number {
    const [hourMinSec, period] = time.split(' ');  
    const [hour, min] = hourMinSec.split(':').map(Number);

    let totalMinutes = hour * 60 + min; 
    if (period === 'PM' && hour !== 12) totalMinutes += 12 * 60;
    if (period === 'AM' && hour === 12) totalMinutes -= 12 * 60;

    return totalMinutes;
  }

  // Convert duration string to minutes
  getDurationInMinutes(duration: string): number {
    const durationMap: { [key: string]: number } = {
      "5 minutes": 5, "10 minutes": 10, "15 minutes": 15, "30 minutes": 30,
      "1 hour": 60, "2 hours": 120, "3 hours": 180, "4 hours": 240, "5 hours": 300,
      "6 hours": 360, "7 hours": 420, "8 hours": 480, "9 hours": 540, "10 hours": 600,
      "11 hours": 660, "0.5 days": 720, "18 hours": 1080
    };
    return durationMap[duration] || 0;
  }

  // Calculate End Time based on selected Start Time and Duration
  calculateEndTime() {
    if (this.startTime.value && this.duration.value) {
      const startMinutes = this.convertToMinutes(this.startTime.value);
      const durationMinutes = this.getDurationInMinutes(this.duration.value);
      const endMinutes = startMinutes + durationMinutes;

      // Handle cases where end time goes past midnight
      const finalMinutes = endMinutes % (24 * 60);

      // Find the closest matching time in the dropdown list
      this.endTime.setValue(this.findClosestTime(finalMinutes));
    }
  }

  // Find the closest matching time in the dropdown list
  findClosestTime(minutes: number): string {
    return this.timeIntervals.find(time => this.convertToMinutes(time) >= minutes) || "11:59:00 PM";
  }

  // Toggle the duration dropdown
  toggleDurationDropdown() {
    this.durationDropdownOpen = !this.durationDropdownOpen;
  }

  // Handle Duration Selection
  selectDuration(duration: string) {
    this.duration.setValue(duration);
    this.durationDropdownOpen = false;
    this.calculateEndTime();
  }
}




<div class="time-picker">
  <mat-form-field>
    <mat-label>Start Time</mat-label>
    <mat-select [formControl]="startTime" (selectionChange)="calculateEndTime()">
      <mat-option *ngFor="let time of timeIntervals" [value]="time">{{ time }}</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field class="duration-field">
    <mat-label>Duration</mat-label>
    <div class="duration-input" (click)="toggleDurationDropdown()">
      <input matInput [formControl]="duration" readonly>
      <mat-icon>arrow_drop_down</mat-icon>
    </div>
    <div class="duration-dropdown" *ngIf="durationDropdownOpen">
      <mat-option *ngFor="let d of durationOptions" (click)="selectDuration(d)">
        {{ d }}
      </mat-option>
    </div>
  </mat-form-field>

  <mat-form-field>
    <mat-label>End Time</mat-label>
    <mat-select [formControl]="endTime">
      <mat-option *ngFor="let time of timeIntervals" [value]="time">{{ time }}</mat-option>
    </mat-select>
  </mat-form-field>
</div>
