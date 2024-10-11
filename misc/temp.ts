function processVisits(visitsList, period) {
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

    // Group visits by pageName and createdDate
    visitsList.forEach(visit => {
        const pageName = visit.pageName;
        const visitDate = convertToLocalDate(new Date(visit.createdDate));
        const visitDateStr = formatDate(visitDate);

        if (!result[pageName]) {
            result[pageName] = {};
        }

        if (!result[pageName][visitDateStr]) {
            result[pageName][visitDateStr] = 0;
        }

        result[pageName][visitDateStr]++;
    });

    // Get the date range for the given period
    const { startDate, endDate } = getDateRange(period);

    // Prepare the final result with sequential dates and visit counts
    const finalResult = {};

    Object.keys(result).forEach(pageName => {
        const pageData = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = formatDate(currentDate);
            pageData.push({
                createdDate: dateStr,
                visitsCount: result[pageName][dateStr] || 0
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        finalResult[pageName] = pageData;
    });

    return finalResult;
}