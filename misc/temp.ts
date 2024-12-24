<div class="upcoming-training-events">
  <h2>Upcoming training events</h2>
  <table>
    <tr *ngFor="let event of events">
      <td>
        <a [routerLink]="['/event-details', event.id]">{{ event.name }}</a>
        <div>{{ event.description }}</div>
      </td>
      <td>
        <div>{{ event.date }}</div>
        <div>{{ event.duration }} • {{ event.seats }} seats left</div>
      </td>
    </tr>
  </table>
  <a routerLink="/full-schedule" class="full-schedule">Full schedule &gt;</a>
</div>


import { Component } from '@angular/core';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent {
  events = [
    {
      id: 1,
      name: 'Oracle SQL',
      description: 'Facilitated event',
      date: 'Starting July 12, 2024',
      duration: '6 weeks',
      seats: 12
    },
    {
      id: 2,
      name: 'Cloud Connect: ERICA',
      description: '10 hrs',
      date: 'July 17, 2024',
      duration: '10 hrs',
      seats: 6
    },
    {
      id: 3,
      name: 'Splunk Vendor Workshop',
      description: 'Facilitated event',
      date: 'August 11, 2024',
      duration: '10 hrs',
      seats: 17
    }
  ];
}


.upcoming-training-events {
  font-family: Arial, sans-serif;
}

.upcoming-training-events h2 {
  font-size: 1.5em;
  margin-bottom: 1rem;
}

.upcoming-training-events table {
  width: 100%;
  border-collapse: collapse;
}

.upcoming-training-events td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

.upcoming-training-events a {
  color: #007bff;
  text-decoration: none;
}

.upcoming-training-events .full-schedule {
  display: block;
  margin-top: 1rem;
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}
