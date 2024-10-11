function getDailyUniqueVisitorsByPage(visitsList, period) {
    // Helper function to format dates as 'YYYY-MM-DD'
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // Helper function to convert UTC date to local date
    function convertToLocalDate(utcDate) {
        const localDate = new Date(utcDate);
        return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    }

    // Helper function to get start and end dates based on the period
    function getDateRange(period) {
        const today = new Date();
        let startDate, endDate;

        if (period === 'MTD') {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = today;
        } else if (period === 'Last Month') {
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        }

        return { startDate, endDate };
    }

    // Initialize the result object
    const result = {};

    // Group unique visitors by pageName and createdDate
    visitsList.forEach(visit => {
        const visitDate = convertToLocalDate(new Date(visit.createdDate));
        const visitDateStr = formatDate(visitDate);
        const standardId = visit.standardId;
        const pageName = visit.pageName;

        if (!result[pageName]) {
            result[pageName] = {};
        }

        if (!result[pageName][visitDateStr]) {
            result[pageName][visitDateStr] = new Set();
        }

        result[pageName][visitDateStr].add(standardId);
    });

    // Get the date range for the given period
    const { startDate, endDate } = getDateRange(period);

    // Prepare the final result with sequential dates and unique visitor counts for each pageName
    const finalResult = {};

    for (const pageName in result) {
        finalResult[pageName] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = formatDate(currentDate);
            finalResult[pageName].push({
                createdDate: dateStr,
                uniqueVisitorsCount: result[pageName][dateStr] ? result[pageName][dateStr].size : 0
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    return finalResult;
}

// Example usage
const visitsList = [{
    "id": 2135,
    "createdBy": "ABC123F",
    "createdDate": "2024-10-09T11:13:08Z",
    "emailAddress": "asdfasdf@xyz.com",
    "fullName": "Kora, Kamiti",
    "modifiedBy": null,
    "modifiedDate": "2024-10-09T11:13:08Z",
    "pageName": "TFGCalendar",
    "standardId": "ABC123F"
}, {
    "id": 2136,
    "createdBy": "ABD123F",
    "createdDate": "2024-10-09T11:13:08Z",
    "emailAddress": "asdfasdf3@xyz.com",
    "fullName": "Kora, Kamiti",
    "modifiedBy": null,
    "modifiedDate": "2024-10-09T11:13:08Z",
    "pageName": "TFGSignup",
    "standardId": "ABD123F"
}, {
    "id": 2137,
    "createdBy": "ABC123F",
    "createdDate": "2024-10-08T11:13:08Z",
    "emailAddress": "example@xyz.com",
    "fullName": "Smith, John",
    "modifiedBy": null,
    "modifiedDate": "2024-10-08T11:13:08Z",
    "pageName": "TFGCalendar",
    "standardId": "ABC123F"
}];

console.log(getDailyUniqueVisitorsByPage(visitsList, 'MTD'));
console.log(getDailyUniqueVisitorsByPage(visitsList, 'Last Month'));
