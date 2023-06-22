import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserQuery } from "../queries/user.queries";
import { environment } from "src/environments/environment";

@Injectable()
export class AnalyticsService {
  public googleDataLayer: any;
  public currentUserId = "ANONYM";
  constructor(private http: HttpClient, private userQuery: UserQuery) {
    this.googleDataLayer = (window as any).dataLayer || [];
    this.userQuery.selectUserProfile$.pipe().subscribe((profile) => {
      if (profile !== null && profile !== undefined) {
        this.currentUserId = profile.userId.toString();
      }
    });
  }

  public trigger(): any {
    const marketingData = {
      application: window.location.pathname.split("/")[1],
      countryCode: localStorage.getItem("language") || "ANONYM",
      // customerId: currentCustomerId,
      event: "Pageview",
      pagePath: window.location.pathname,
      pageTitle: window.location.pathname.split("/").pop(),
      environment: environment.env,
      // userCategory: currentUserCategory,
      userId: this.currentUserId,
      userType: "C",
    };
    if (this.googleDataLayer) {
      this.googleDataLayer.push(marketingData);
    }
  }
  public triggerCustom(name: string): any {
    const marketingData = {
      application: window.location.pathname.split("/")[1],
      countryCode: localStorage.getItem("language") || "ANONYM",
      // customerId: currentCustomerId,
      event: "Pageview",
      pagePath: `/${name}`,
      pageTitle: `${name}`,
      environment: environment.env,
      // userCategory: currentUserCategory,
      userId: this.currentUserId,
      userType: "C",
    };
    if (this.googleDataLayer) {
      this.googleDataLayer.push(marketingData);
    }
  }
  public triggerAction(custom: any) {
    if (this.googleDataLayer) {
      this.googleDataLayer.push(custom);
    }
  }
}
