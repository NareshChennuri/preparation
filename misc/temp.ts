// Sample Data
const data = [
  // (Include the JSON data here)
];

// Group by Region
const groupByRegion = data.reduce((acc, curr) => {
  const region = curr.region;
  const eventType = curr.programOfferings;
  const eventId = curr.eventId;
  const standardId = curr.standardId;

  if (!acc[region]) {
    acc[region] = { programOfferings: {}, uniqueParticipants: new Set(), registrations: new Set() };
  }

  // Count program offerings
  acc[region].programOfferings[eventType] = (acc[region].programOfferings[eventType] || 0) + 1;

  // Count distinct participants
  acc[region].uniqueParticipants.add(standardId);

  // Count distinct events by eventId
  acc[region].registrations.add(eventId);

  return acc;
}, {});

// Group by Language (Chapter)
const groupByLanguage = data.reduce((acc, curr) => {
  const chapter = curr.language;
  const eventType = curr.programOfferings;
  const eventId = curr.eventId;
  const standardId = curr.standardId;

  if (!acc[chapter]) {
    acc[chapter] = { programOfferings: {}, uniqueParticipants: new Set(), registrations: new Set() };
  }

  acc[chapter].programOfferings[eventType] = (acc[chapter].programOfferings[eventType] || 0) + 1;
  acc[chapter].uniqueParticipants.add(standardId);
  acc[chapter].registrations.add(eventId);

  return acc;
}, {});

// Group by Event Type (programOfferings)
const groupByEventType = data.reduce((acc, curr) => {
  const eventType = curr.programOfferings;
  const chapter = curr.language;
  const eventId = curr.eventId;
  const standardId = curr.standardId;

  if (!acc[eventType]) {
    acc[eventType] = { chapters: {}, uniqueParticipants: new Set(), registrations: new Set() };
  }

  acc[eventType].chapters[chapter] = (acc[eventType].chapters[chapter] || 0) + 1;
  acc[eventType].uniqueParticipants.add(standardId);
  acc[eventType].registrations.add(eventId);

  return acc;
}, {});
