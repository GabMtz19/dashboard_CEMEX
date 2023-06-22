import { Jobsite } from '../models/jobsite';
import { StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface JobsitesState extends EntityState<Jobsite, number> {
  areJobsitesLoaded: boolean;
  jobsites: Jobsite[];
  activeJobsite: Jobsite;
}

export function createInitialState(): JobsitesState {
  return {
    areJobsitesLoaded: false,
    jobsites: [],
    activeJobsite: null,
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "jobsites" })
export class JobsiteStore extends EntityStore<JobsitesState> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Store jobsites into the store.
   *
   * @param jobsites The jobsites of the current Legal Entity
   * @param areJobsitesLoaded Whether to consider the jobsites to have been fetched from backend
   */
  loadJobsites(jobsites: Jobsite[], areJobsitesLoaded: boolean) {
    this.update((state) => ({
      ...state,
      areJobsitesLoaded,
      jobsites,
      activeJobsite: jobsites[0],
    }));
  }

  /**
   * Store the id of the active Jobsite.
   *
   * @param activeJobsiteId The id of the currently selected Jobsite
   */
  setActiveJobsite(activeJobsite: Jobsite) {
    this.update((state) => ({
      ...state,
      activeJobsite,
    }));
  }
}
