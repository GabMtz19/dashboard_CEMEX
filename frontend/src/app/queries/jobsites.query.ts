import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { JobsitesState, JobsiteStore } from '../states/jobsites.store';

@Injectable({ providedIn: 'root' })
export class JobsiteQuery extends QueryEntity<JobsitesState> {

  /**
   * Check if the jobsites have bene loaded.
   */
  selectAreJobsitesLoaded$ = this.select(state => {
    return state.areJobsitesLoaded;
  });

  /**
   * Get the jobsites for the selected Legal Entity
   */
  selectJobsites$ = this.select(state => state.jobsites);

  /**
   * Get the id of the selected jobsite
   */
  selectActiveJobsiteId$ = this.select(state => state.activeJobsiteId);

  constructor(protected store: JobsiteStore) {
    super(store);
  }
}
