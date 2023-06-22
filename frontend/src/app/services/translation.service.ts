import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CmxAppQuery } from "../queries/app.queries";
import { CmxAppStore } from "../states/app.store";
export class TranslationSet {
  public languange: string;
  public values: { [key: string]: string } = {};
}

@Injectable()
export class TranslationService {
  private rawTranslations: any;

  constructor(
    private http: HttpClient,
    private appStore: CmxAppStore,
    private appQueries: CmxAppQuery
  ) {
    this.appQueries.selectUserLanguage$.subscribe((value) => {
      this.loadTranslations();
    });
  }

  public loadTranslations(): any {
    return new Promise((resolve) => {
      if (
        localStorage.getItem("language") === null ||
        localStorage.getItem("language") === undefined
      ) {
        this.http.get(`/assets/locale/en_US.json`).subscribe((value) => {
          this.rawTranslations = value;
          resolve(true);
        });
      } else {
        /* 
        ToDo: Here we could check if language is loaded previously 
        */
        this.http
          .get(`/assets/locale/${localStorage.getItem("language")}.json`)
          .subscribe((value) => {
            this.rawTranslations = value;
            resolve(true);
          });
      }
    });
  }
  public getTranslation(key: string): string {
    if (
      this.rawTranslations[key] === null ||
      this.rawTranslations[key] === undefined
    ) {
      return `NOT:${key}`;
    }
    return this.rawTranslations[key] || "";
  }
}
