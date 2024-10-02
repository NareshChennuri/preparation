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

const regionArray = Object.keys(groupByRegion).map(region => {
  const eventTypes = Object.entries(groupByRegion[region].programOfferings)
    .map(([eventType, count]) => `${eventType} (${count})`)
    .join(', ');

  return {
    region,
    eventType: eventTypes,
    distinctParticipantsCount: groupByRegion[region].uniqueParticipants.size,
    registrationsCount: groupByRegion[region].registrations.size
  };
});


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

const chapterArray = Object.keys(groupByLanguage).map(chapter => {
  const eventTypes = Object.entries(groupByLanguage[chapter].programOfferings)
    .map(([eventType, count]) => `${eventType} (${count})`)
    .join(', ');

  return {
    chapter,
    eventType: eventTypes,
    distinctParticipantsCount: groupByLanguage[chapter].uniqueParticipants.size,
    registrationsCount: groupByLanguage[chapter].registrations.size
  };
});


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

const chapterArray = Object.keys(groupByLanguage).map(chapter => {
  const eventTypes = Object.entries(groupByLanguage[chapter].programOfferings)
    .map(([eventType, count]) => `${eventType} (${count})`)
    .join(', ');

  return {
    chapter,
    eventType: eventTypes,
    distinctParticipantsCount: groupByLanguage[chapter].uniqueParticipants.size,
    registrationsCount: groupByLanguage[chapter].registrations.size
  };
});
