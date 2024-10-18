export function convertUTCToETC(utcDateString: string): string {
    // Create a Date object from the UTC date string
    const utcDate: Date = new Date(utcDateString);

    // Define options for formatting the date in Eastern Time
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Set to true for 12-hour format
    };

    // Format the date using Intl.DateTimeFormat
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(utcDate);
}

// Example usage in a component
import { Component } from '@angular/core';
import { convertUTCToETC } from './convert-utc-to-etc';

@Component({
    selector: 'app-date-converter',
    template: `<div>{{ convertedDate }}</div>`
})
export class DateConverterComponent {
    convertedDate: string;

    constructor() {
        const utcDate = '2024-10-18T15:00:00Z'; // Example UTC date string
        this.convertedDate = convertUTCToETC(utcDate);
    }
}
