export function getDateRange(period: 'MTD' | 'Last Month'): { startDate: Date; endDate: Date } {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    if (period === 'MTD') {
        // Start of the current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        // End of today
        endDate = new Date(now);
    } else if (period === 'Last Month') {
        // Start of the last month
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        // End of the last month
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
    } else {
        throw new Error('Invalid period specified. Use "MTD" or "Last Month".');
    }

    // Convert both start and end dates to Eastern Time
    const easternTimezoneOffset = -5 * 60; // EST is UTC-5; EDT is UTC-4 (Daylight Saving)
    startDate.setMinutes(startDate.getMinutes() + easternTimezoneOffset);
    endDate.setMinutes(endDate.getMinutes() + easternTimezoneOffset);

    return { startDate, endDate };
}

// Example usage in a component
import { Component } from '@angular/core';
import { getDateRange } from './get-date-range';

@Component({
    selector: 'app-date-range',
    template: `<div>
                 <p>Start Date: {{ startDate | date }}</p>
                 <p>End Date: {{ endDate | date }}</p>
               </div>`
})
export class DateRangeComponent {
    startDate: Date;
    endDate: Date;

    constructor() {
        const period = 'MTD'; // Change to 'Last Month' to test the other option
        const dateRange = getDateRange(period);
        this.startDate = dateRange.startDate;
        this.endDate = dateRange.endDate;
    }
}
