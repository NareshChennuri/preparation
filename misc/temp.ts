export function formatDate(date: Date): string {
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
    const day: string = date.getDate().toString().padStart(2, '0'); // getDate() returns 1-31
    const year: string = date.getFullYear().toString(); // getFullYear() returns the 4-digit year
    return `${month}/${day}/${year}`;
}

// Example usage
import { Component } from '@angular/core';
import { getDateRange } from './get-date-range';
import { formatDate } from './format-date';

@Component({
    selector: 'app-date-range',
    template: `<div>
                 <p>Start Date: {{ formattedStartDate }}</p>
                 <p>End Date: {{ formattedEndDate }}</p>
               </div>`
})
export class DateRangeComponent {
    formattedStartDate: string;
    formattedEndDate: string;

    constructor() {
        const period = 'MTD'; // Change to 'Last Month' to test the other option
        const dateRange = getDateRange(period);
        this.formattedStartDate = formatDate(dateRange.startDate);
        this.formattedEndDate = formatDate(dateRange.endDate);
    }
}
