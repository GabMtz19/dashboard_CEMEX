import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
@Injectable()
export class CountryService {
  constructor(private http: HttpClient) {}

  public getCountries(): any {
    this.http
      .get(`https://${environment.host}/api/v6/ce/countries?countryCode=US`)
      .subscribe((value) => {
        console.log(value);
      });
  }
}
