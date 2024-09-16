function groupAndSortEvents(eventsList) {
    const groupedEvents = {};

    // Group events by region, environment, and programOfferings
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

    // Convert the object into an array
    const result = Object.values(groupedEvents);

    // Sort by region, keeping each region separate
    result.sort((a, b) => a.region.localeCompare(b.region));

    return result;
}
