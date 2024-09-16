function groupAndSortEvents(eventsList) {
    const groupedEvents = {};

    // Group events by region, environment, and programOfferings
    eventsList.forEach(event => {
        const { region, environment, programOfferings } = event;
        const key = `${region}-${environment}-${programOfferings}`;  // Unique key for each region + environment + programOfferings

        if (!groupedEvents[key]) {
            groupedEvents[key] = {
                region,
                environment,
                programOfferings: `${programOfferings} (1)`  // Start with 1 event
            };
        } else {
            // Increment the event count for this grouping
            const count = parseInt(groupedEvents[key].programOfferings.match(/\d+/)[0]) + 1;
            groupedEvents[key].programOfferings = `${programOfferings} (${count})`;
        }
    });

    // Convert the grouped events object into an array
    const result = Object.values(groupedEvents);

    // Sort the result array by region
    result.sort((a, b) => a['region'].localeCompare(b['region']));

    return result;
}
