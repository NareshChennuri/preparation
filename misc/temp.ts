getRegistrationsYesterday(events) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const dayBeforeYesterday = new Date();
    dayBeforeYesterday.setDate(yesterday.getDate() - 1);

    // Filter events for yesterday
    const yesterdayEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        return regDate.toDateString() === yesterday.toDateString();
    });

    // Filter events for day before yesterday
    const dayBeforeYesterdayEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        return regDate.toDateString() === dayBeforeYesterday.toDateString();
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

getRegistrationsMTD(events) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter events for month-to-date
    const mtdEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        return regDate >= startOfMonth && regDate <= now;
    });

    const totalMTDCount = mtdEvents.length;

    return {
        mtdEvents,
        totalMTDCount
    };
}

getRegistrationsLastMonth(events) {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // last day of last month

    // Filter events for last month
    const lastMonthEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        return regDate >= startOfLastMonth && regDate <= endOfLastMonth;
    });

    const totalLastMonthCount = lastMonthEvents.length;

    // Filter events for month before last month
    const monthBeforeLastEvents = events.filter(event => {
        const regDate = new Date(event.registrationDate);
        return regDate >= new Date(now.getFullYear(), now.getMonth() - 2, 1)
            && regDate <= new Date(now.getFullYear(), now.getMonth() - 1, 0);
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
