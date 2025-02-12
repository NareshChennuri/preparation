import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-duration',
  templateUrl: './time-duration.component.html',
  styleUrls: ['./time-duration.component.scss']
})
export class TimeDurationComponent {
  timeIntervals: string[] = [];
  startTime = new FormControl('');
  endTime = new FormControl('');
  duration = new FormControl('');

  constructor() {
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    const times: string[] = [];
    let start = new Date();
    start.setHours(0, 0, 0, 0); // Midnight

    for (let i = 0; i < 96; i++) { // 96 intervals of 15 mins in 24 hrs
      const hours = start.getHours();
      const minutes = start.getMinutes();
      const formattedTime = `${this.formatTime(hours)}:${this.formatTime(minutes)} ${hours >= 12 ? 'PM' : 'AM'}`;
      times.push(formattedTime);
      start.setMinutes(start.getMinutes() + 15);
    }
    
    this.timeIntervals = times;
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  calculateDuration() {
    if (this.startTime.value && this.endTime.value) {
      const startMinutes = this.convertToMinutes(this.startTime.value);
      const endMinutes = this.convertToMinutes(this.endTime.value);

      if (endMinutes > startMinutes) {
        const diff = endMinutes - startMinutes;
        this.duration.setValue(this.formatDuration(diff));
      } else {
        this.duration.setValue('Invalid Selection');
      }
    }
  }

  convertToMinutes(time: string): number {
    const [hourMin, period] = time.split(' ');
    const [hour, min] = hourMin.split(':').map(Number);
    let totalMinutes = hour * 60 + min;
    if (period === 'PM' && hour !== 12) totalMinutes += 12 * 60;
    if (period === 'AM' && hour === 12) totalMinutes -= 12 * 60;
    return totalMinutes;
  }

  formatDuration(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? hrs + ' hr ' : ''}${mins > 0 ? mins + ' min' : ''}`;
  }
}
