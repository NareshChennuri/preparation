function getDailyUniqueVisitors(visitsList, period) {
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

    // Group unique visitors by createdDate
    visitsList.forEach(visit => {
        const visitDate = convertToLocalDate(new Date(visit.createdDate));
        const visitDateStr = formatDate(visitDate);
        const standardId = visit.standardId;

        if (!result[visitDateStr]) {
            result[visitDateStr] = new Set();
        }

        result[visitDateStr].add(standardId);
    });

    // Get the date range for the given period
    const { startDate, endDate } = getDateRange(period);

    // Prepare the final result with sequential dates and unique visitor counts
    const finalResult = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dateStr = formatDate(currentDate);
        finalResult.push({
            createdDate: dateStr,
            uniqueVisitorsCount: result[dateStr] ? result[dateStr].size : 0
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return finalResult;
}
