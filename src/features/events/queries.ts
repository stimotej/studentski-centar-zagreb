const eventKeys = {
  events: ["events"],
  newEvents: ["events", "new"],
  event: (slug: string) => [...eventKeys.events, slug],
};

export default eventKeys;
