function getRegistrationsYesterday(events) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0); // Normalize to start of the day

    const dayBeforeYesterday = new Date();
    dayBeforeYesterday.setDate(yesterday.getDate() - 1);
    dayBeforeYesterday.setHours(0, 0, 0, 0);

    // Filter events for yesterday
    const yesterdayEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        regDate.setHours(0, 0, 0, 0); // Normalize registration date
        return regDate.getTime() === yesterday.getTime();
    });

    // Filter events for day before yesterday
    const dayBeforeYesterdayEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        regDate.setHours(0, 0, 0, 0); // Normalize registration date
        return regDate.getTime() === dayBeforeYesterday.getTime();
    });

    const totalYesterdayCount = yesterdayEvents.length;
    const totalDayBeforeYesterdayCount = dayBeforeYesterdayEvents.length;

    const percentageChange = totalDayBeforeYesterdayCount > 0
        ? ((totalYesterdayCount - totalDayBeforeYesterdayCount) / totalDayBeforeYesterdayCount) * 100
        : 100;
    const isIncreased = totalYesterdayCount > totalDayBeforeYesterdayCount;

    return {
        yesterdayEvents,
        totalYesterdayCount,
        percentageChange: percentageChange.toFixed(2),
        isIncreased
    };
}

function getRegistrationsMTD(events) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0); // Normalize to start of the month

    // Filter events for month-to-date
    const mtdEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        regDate.setHours(0, 0, 0, 0); // Normalize registration date
        return regDate >= startOfMonth && regDate <= now;
    });

    const totalMTDCount = mtdEvents.length;

    return {
        mtdEvents,
        totalMTDCount
    };
}

function getRegistrationsLastMonth(events) {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of last month
    startOfLastMonth.setHours(0, 0, 0, 0); // Normalize to start of last month
    endOfLastMonth.setHours(23, 59, 59, 999); // Normalize to end of last month

    // Filter events for last month
    const lastMonthEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        regDate.setHours(0, 0, 0, 0); // Normalize registration date
        return regDate >= startOfLastMonth && regDate <= endOfLastMonth;
    });

    const totalLastMonthCount = lastMonthEvents.length;

    // Filter events for month before last month
    const startOfMonthBeforeLast = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const endOfMonthBeforeLast = new Date(now.getFullYear(), now.getMonth() - 1, 0);
    startOfMonthBeforeLast.setHours(0, 0, 0, 0); // Normalize to start of the month before last
    endOfMonthBeforeLast.setHours(23, 59, 59, 999); // Normalize to end of the month before last

    const monthBeforeLastEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        regDate.setHours(0, 0, 0, 0); // Normalize registration date
        return regDate >= startOfMonthBeforeLast && regDate <= endOfMonthBeforeLast;
    });

    const totalMonthBeforeLastCount = monthBeforeLastEvents.length;

    const percentageChange = totalMonthBeforeLastCount > 0
        ? ((totalLastMonthCount - totalMonthBeforeLastCount) / totalMonthBeforeLastCount) * 100
        : 100;
    const isIncreased = totalLastMonthCount > totalMonthBeforeLastCount;

    return {
        lastMonthEvents,
        totalLastMonthCount,
        percentageChange: percentageChange.toFixed(2),
        isIncreased
    };
}
