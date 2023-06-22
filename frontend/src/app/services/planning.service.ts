import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private planningsUrl = 'api/plannings';  // URL to web api
  private planningStatusesUrl = 'api/planningstatuses';  // URL to web api
  private planningColorsUrl = 'api/planningcolors';  // URL to web api
  // private id = 'api/plannings/id';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient ) { }

  public getPlannings(){
    return this.http.get(this.planningsUrl);
  }

  public getPlanningStatuses(){
    return this.http.get(this.planningStatusesUrl);
  }

  public getPlanningColors(){
    return this.http.get(this.planningColorsUrl);
  }

  public getPlanning(id){
      const url =`${this.planningsUrl}/${id}`;
      return this.http.get(url).pipe(
        tap(_ => this.log(`fetched planning id=${id}`))
      ); 
  }
  
  public createPlanning(
    planning: {
      id: number,
      statusColor: string,
      statusMessage: string, 
      jobsite: string, 
      purchaseorder: string, 
      hauler: string, 
      quarry: string, 
      date: Date, 
      product: string, 
      quantity: number
    }){
    return this.http.post(`${this.planningsUrl}`, planning, this.httpOptions);
  }

  public updatePlanning(
    planning: {
      id: number, 
      statusColor: string,
      statusMessage: string, 
      jobsite: string, 
      purchaseorder: string, 
      hauler: string, 
      quarry: string, 
      date: Date, 
      product: string, 
      quantity: number}){
    return this.http.put(`${this.planningsUrl}/${planning.id}`, planning);
  }

  // public deleteJobsite(policyId){
  //   return this.http.delete(`${this.jobsitesUrl + 'jobsites'}/${policyId}`)
  // }

  // public updateJobsite(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
  //   return this.http.put(`${this.jobsitesUrl + 'jobsites'}/${policy.id}`, policy)
  // }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`PlanningService: ${message}`);
  }
}
