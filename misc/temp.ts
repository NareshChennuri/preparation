function groupAndSortEvents(eventsList) {
    const groupedEvents = {};

    // Group events by region and programOfferings
    eventsList.forEach(event => {
        const key = `${event.region}-${event.environment}-${event.programOfferings}`;
        if (!groupedEvents[key]) {
            groupedEvents[key] = {
                region: event.region,
                environment: event.environment,
                programOfferings: `${event.programOfferings} (1)`
            };
        } else {
            // Increment the count in programOfferings
            const count = parseInt(groupedEvents[key].programOfferings.match(/\d+/)[0]) + 1;
            groupedEvents[key].programOfferings = `${event.programOfferings} (${count})`;
        }
    });

    // Convert the object into an array and sort by region
    const result = Object.values(groupedEvents);
    result.sort((a, b) => a.region.localeCompare(b.region));

    return result;
}
