import { JobsFilters } from ".";

const jobKeys = {
  jobs: ["jobs"],
  jobsHome: ["jobs", "home"],
  skills: ["skills"],
  jobsFiltered: (filters: JobsFilters) => [...jobKeys.jobs, filters],
  job: (slug: string) => [...jobKeys.jobs, slug],
};

export default jobKeys;
