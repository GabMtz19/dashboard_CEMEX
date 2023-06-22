import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private deliveriesUrl = 'api/deliveries';  // URL to web api
  // private ticketsUrl = 'api/deliveries';  // URL to web api
  private deliveryStatusesUrl = 'api/deliverystatuses';
  private statusColorUrl = 'api/statuscolor';

  constructor(private http: HttpClient) { }

  public getDeliveries(){
    return this.http.get(this.deliveriesUrl);
  }

  public getDeliveryStatuses(){
    return this.http.get(this.deliveryStatusesUrl);
  }

  public getStatusColor(){
    return this.http.get(this.statusColorUrl);
  }

  public getDelivery(id){
    const url =`${this.deliveriesUrl}/${id}`;
    return this.http.get(url).pipe(
      tap(_ => this.log(`fetched delivery id=${id}`))
    ); 
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`DeliveryService: ${message}`);
  }
}
