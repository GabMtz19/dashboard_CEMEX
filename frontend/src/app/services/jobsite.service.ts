import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe, observable } from 'rxjs';
import { catchError, map, tap, timeout, filter, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Jobsite } from '../models/jobsite';
import { environment } from 'src/environments/environment';
import { LegalEntityQuery } from '../queries/legal-entity.queries';
import { JobsiteStore } from '../states/jobsites.store';
import { JobsiteQuery } from '../queries/jobsites.query';
import { endOfToday, startOfToday } from '../utils/date.util';

@Injectable({
  providedIn: "root",
})
export class JobsiteService {
  // private jobsitesUrl = 'api/v7/dm/jobsites/summary';  // URL to web api
  private jobsitesUrl = "api/v4/dm/jobsites/summary"; // URL to web api

  // This pays attention to the changes to the selected
  // Entity and starts a download of Jobsites.
  private jobsitesFromBackendObservable: Observable<Jobsite[]> = null;

  // This pays attention to the JobsiteQuery.selectJobsites$
  private jobsitesFromStorageObservable: Observable<Jobsite[]> = null;

  constructor(
    private http: HttpClient,
    private legalEntityQuery: LegalEntityQuery,
    private store: JobsiteStore,
    private jobsiteQuery: JobsiteQuery
  ) {}

  /**
   * Get the jobsites for the currently selected Legal Entity.
   *
   * <p>Configures the plumbing so that when the Legal Entity selection
   * changes the Jobsites get downloaded and updated in JobsiteState,
   * and therefore the Observable returned from this function is updated
   * as well.</p>
   *
   * @returns An observable that monitors JobsiteQuery.selectJobsites$
   */
  public getJobsites(): Observable<Jobsite[]> {
    if (null != this.jobsitesFromStorageObservable) {
      return this.jobsitesFromStorageObservable;
    } else {
      const bkEndObs = this.prepareBackendObservable();
      bkEndObs.subscribe();
      this.jobsitesFromBackendObservable = bkEndObs;

      const storageObs = this.prepareStorageObservable();
      this.jobsitesFromStorageObservable = storageObs;
      return this.jobsitesFromStorageObservable;
    }
  }

  /**
   * Connects the Legal Entity storage so that when it changes
   * a request to the backend API is made.
   *
   * @returns An observable that emits the jobsites downloaded from
   *          the backend.
   */
  private prepareBackendObservable(): Observable<Jobsite[]> {
    const obs: Observable<Jobsite[]> =
      this.legalEntityQuery.selectActiveLegalEntity$.pipe(
        filter((active) => !!active),
        switchMap((active) =>
          this.getJobsitesForLegalEntity(active.legalEntityId)
        )
      );
    return obs;
  }

  /**
   * Get the jobsites from storage
   *
   * @returns An observable that emits Jobsites when the jobsites store is updated.
   */
  private prepareStorageObservable(): Observable<Jobsite[]> {
    const obs = this.jobsiteQuery.selectJobsites$;
    return obs;
  }

  /**
   * Makes a request to the backend API to fetch the jobsites for the given
   * legal entity.
   *
   * <p>The Jobsites are also stored in
   *
   * @param legalEntityId The id of the legal entity for which we want to fetch
   *                      the Jobsites
   *
   * @returns An Observable that emits the Jobsites downloaded from the backend.
   */
  private getJobsitesForLegalEntity(
    legalEntityId: number
  ): Observable<Jobsite[]> {
    const apiCallUrl = `https://${environment.host}/${this.jobsitesUrl}`;

    const options = {
      params: {
        // TODO: Use today's date
        dateFrom: "2020-07-13T05:00:00",
        dateTo: "2020-07-14T04:59:59",
        customerId: String(legalEntityId),
        isWeb: "true",
      },
    };
    return this.http.get<Jobsite[]>(apiCallUrl, options).pipe(
      map((response: any) => response.jobsites as Jobsite[]),
      tap((jobsites) => {
        // this.store.loadJobsites(jobsites.slice(0, 20));
        this.store.loadJobsites(jobsites, true);
      })
    );
  }

  public getJobsite(id) {
    const url = `${this.jobsitesUrl}/${id}`;
    return this.http
      .get(url)
      .pipe(tap((_) => this.log(`fetched jobsite id=${id}`)));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`JobsiteService: ${message}`);
  }

  public createJobsite(
    jobsite: Jobsite
    // {
    //   id: number,
    //   jobsitename: string,
    //   jobsitestreet: string,
    //   streetnumber: string,
    //   country: any,
    //   state: any,
    //   city: string,
    //   zipcode: string,
    //   foreman: any,
    //   product: any,
    // }
  ) {
    return this.http.post(`${this.jobsitesUrl}`, jobsite);
  }

  // public deleteJobsite(policyId){
  //   return this.http.delete(`${this.jobsitesUrl + 'jobsites'}/${policyId}`)
  // }

  // public updateJobsite(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
  //   return this.http.put(`${this.jobsitesUrl + 'jobsites'}/${policy.id}`, policy)
  // }

  fetchJobsitesSummary() {
    this.legalEntityQuery.selectActiveLegalEntity$
      .pipe(
        filter((active) => !!active),
        switchMap((active) => this.getJobsitesSummary(active.legalEntityId))
      )
      .subscribe();
  }

  setActiveJobsite(jobsite: Jobsite) {
    this.store.setActiveJobsite(jobsite);
  }

  private getJobsitesSummary(legalEntityId: number): Observable<Jobsite[]> {
    const url = `https://${environment.host}/api/v7/dm/jobsites/summary`;
    const options = {
      params: {
        dateFrom: startOfToday(),
        dateTo: endOfToday(),
        customerId: String(legalEntityId),
        isWeb: "true",
      },
    };

    return this.http.get<Jobsite[]>(url, options).pipe(
      map((response: any) => response.jobsites as Jobsite[]),
      tap((jobsites) => {
        const aux = jobsites.length > 5 ? jobsites.slice(0, 5) : jobsites;
        this.store.loadJobsites(aux, true);
      })
    );
  }
}
