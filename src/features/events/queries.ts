const eventKeys = {
  events: ["events"],
  newEvents: ["events", "new"],
  sliderEvents: ["events", "slider"],
  courses: ["events", "courses"],
  event: (slug: string) => [...eventKeys.events, slug],
};

export default eventKeys;
