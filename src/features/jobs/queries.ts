import { JobsFilters } from ".";

const jobKeys = {
  jobs: ["jobs"],
  skills: ["skills"],
  jobsFiltered: (filters: JobsFilters) => [...jobKeys.jobs, filters],
  job: (slug: string) => [...jobKeys.jobs, slug],
};

export default jobKeys;
