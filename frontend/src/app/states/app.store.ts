import moment from "moment";

import { EntityState, EntityStore, ID, StoreConfig } from "@datorama/akita";

import { Application } from "../models/application.model";
import { Injectable } from "@angular/core";
import { OAuth2 } from "../models/oauth2.model";
import { User } from "../models/user.model";

export interface CmxAppState extends EntityState<string> {
  oauth2: OAuth2;
  jwt: string;
  environment: string;
  deviceLanguage: string;
  userLanguage: string;
  isRTL: number; //this is a number because we need a semaphore for the menu
}

export function createInitialState(): CmxAppState {
  return {
    oauth2: null,
    jwt: null,
    environment: "dev2.cemexgo.com",
    deviceLanguage: navigator.language,
    // tslint:disable-next-line: max-line-length
    userLanguage:
      localStorage.getItem("language") === undefined ||
      localStorage.getItem("language") === null
        ? "en_US"
        : localStorage.getItem("language"),
    isRTL: 0,
  };
}

@Injectable({
  providedIn: "root",
})
@StoreConfig({ name: "cmxApp" })
export class CmxAppStore extends EntityStore<CmxAppState> {
  constructor() {
    super(createInitialState());
    localStorage.setItem("env", this.getValue().environment);
  }

  /**
   * saves the tokens into the working state, this method also saves the tokens to the
   * persistant localstorage to continue after user closes the app
   * @param jwts
   * @param token
   */
  setTokens(jwts: string, token: OAuth2) {
    this.update((state) => ({
      ...state,
      jwt: jwts,
      oauth2: token,
    }));
    localStorage.setItem("jwt", jwts);
    localStorage.setItem("bearer", token.access_token);
    localStorage.setItem("refresh_token", token.refresh_token);
    // we remove 15 minutes to avoid problems with mobile interactions
    localStorage.setItem(
      "expiration",
      moment()
        .add(token.expires_in - 60 * 15, "seconds")
        .toString()
    );
  }

  /**
   * this method is called internally in the app to set and save the device
   * language
   * @param language language from the device
   */
  setDeviceLanguage(language: string) {
    // first split the first 2 characters to see the main language
    const mainLanguage = navigator.language.substr(0, 2);
    this.update((state) => ({
      ...state,
      deviceLanguage: language,
    }));
  }
  /**
   * set the language from the user configurations, commonly brought by the token API
   * @param language
   */
  setUserLanguage(language: string) {
    // also update the default configuration from our data set
    localStorage.setItem("language", language);
    this.update((state) => ({
      ...state,
      userLanguage: language,
    }));
  }

  /**
   * set the language text direction for the entire application
   * @param isRTL
   * 0 is undefined, 1 is LTR and 2 is RTL
   */
  setRTL(zisRTL: number) {
    this.update((state) => ({
      ...state,
      isRTL: zisRTL,
    }));
  }

  /**
   * this method destroys the current session of the user for logging out purposes
   */
  logout() {
    createInitialState();
    localStorage.removeItem("jwt");
    localStorage.removeItem("bearer");
  }
}
