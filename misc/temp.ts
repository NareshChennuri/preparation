function eventsGroupByRegion(eventsList) {
    const groupedEvents = eventsList.reduce((acc, event) => {
        const { region, environment, programOfferings } = event;

        // Check if the region is already in the accumulator
        const existingRegion = acc.find(e => e.region === region);

        if (existingRegion) {
            // If the environment is already present, increment the count
            const envIndex = existingRegion.environment.findIndex(env => env.name === environment);
            if (envIndex > -1) {
                existingRegion.environment[envIndex].count += 1;
            } else {
                existingRegion.environment.push({ name: environment, count: 1 });
            }

            // Check if the program offering is already present
            const progIndex = existingRegion.programOfferings.findIndex(prog => prog.name === programOfferings);
            if (progIndex > -1) {
                existingRegion.programOfferings[progIndex].count += 1;
            } else {
                existingRegion.programOfferings.push({ name: programOfferings, count: 1 });
            }
        } else {
            // If the region is not present, create a new object for it
            acc.push({
                region: region,
                environment: [{ name: environment, count: 1 }],
                programOfferings: [{ name: programOfferings, count: 1 }]
            });
        }

        return acc;
    }, []);

    // Format the output to the desired structure
    const result = groupedEvents.map(eventGroup => ({
        region: eventGroup.region,
        environment: eventGroup.environment.map(env => `${env.name}(${env.count})`).join(', '),
        programOfferings: eventGroup.programOfferings.map(prog => `${prog.name}(${prog.count})`).join(', ')
    }));

    return result;
}
