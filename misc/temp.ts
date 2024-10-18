export function gtDateRange(period: 'MTD' | 'Last Month'): { startDate: string; endDate: string } {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    
    let startDate: Date;
    let endDate: Date;

    const now = new Date();
    
    if (period === 'MTD') {
        // Start of the current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        // End of the current day
        endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
    } else if (period === 'Last Month') {
        // Start of the last month
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        // End of the last month
        endDate = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the last month
    }

    return {
        startDate: formatter.format(startDate),
        endDate: formatter.format(endDate)
    };
}

// Example usage in a component
import { Component } from '@angular/core';
import { gtDateRange } from './gt-date-range';

@Component({
    selector: 'app-date-range',
    template: `<div>Start Date: {{ dateRange.startDate }}<br>End Date: {{ dateRange.endDate }}</div>`
})
export class DateRangeComponent {
    dateRange: { startDate: string; endDate: string };

    constructor() {
        this.dateRange = gtDateRange('MTD'); // Example: get MTD date range
        // this.dateRange = gtDateRange('Last Month'); // Uncomment to get the Last Month date range
    }
}
