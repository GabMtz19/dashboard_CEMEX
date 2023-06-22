import { Component, NgZone, OnInit } from "@angular/core";
import { CmxAppStore } from "./states/app.store";

import { LocaleService } from "src/app/services/locale.service";
import { akitaDevtools } from "@datorama/akita";
import { delay } from "rxjs/operators";
import { LocaleQuery } from "./queries/locale.queries";
import { LocaleStore } from "./states/locale.store";

import { from } from "rxjs";
import { TranslationService } from "./services/translation.service";
import { UserQuery } from "./queries/user.queries";
import { LegalEntityService } from "./services/legal-entity.service";
import { SessionService } from "./services/session.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
/*
  ToDo: Check translate pipe and service in order to manage race condition
*/
export class AppComponent implements OnInit {
  title = "cmx-learnhub-prototype";
  public loadingCompleted: Boolean = false;

  constructor(
    private appStore: CmxAppStore,
    private translationService: TranslationService,
    private ngZone: NgZone,
    private localeService: LocaleService,
    private localeQuery: LocaleQuery,
    private localeStore: LocaleStore,
    private sessionService: SessionService,
    private userQuery: UserQuery,
    private legalEntitiesService: LegalEntityService
  ) {
    //localStorage.clear();
    akitaDevtools(this.ngZone, {});
    from(this.translationService.loadTranslations()).subscribe((result) => {
      this.loadingCompleted = Boolean(result);
    });
  }

  ngOnInit(): void {
    this.localeService.getLanguageConfigs();

    /*
    ToDo: Different uses, uncomment if needed.
    */
    // this.localeQuery.availableLanguages$
    //   .pipe(filter((langs) => !!langs && langs.length > 0))
    //   .subscribe((langs) => {
    //     if (
    //       localStorage.getItem("language") === null ||
    //       localStorage.getItem("language") === undefined
    //     ) {
    //       const mainLanguage = navigator.language.substr(0, 2);
    //       const possibleLanguage = langs.filter((lang) =>
    //         lang.languageISO.includes(`${mainLanguage}_`)
    //       );
    //       // use the closest language from the device
    //       // from the possible languages, use the 1st, which can be the closest to the user
    //       this.appStore.setUserLanguage(possibleLanguage[0].languageISO);
    //     } else {
    //       this.localeStore.setActiveLanguage(localStorage.getItem("language"));
    //     }
    //     // we have the language definitions and we are
    //     // ready to load the device language
    //     // load translations into service

    //   });

    // idenfity if the app has been reloaded somehow and extract the tokens
    // firstly by refreshing the token
    this.userQuery.selectUserProfile$.subscribe((profiles) => {
      // the initial values of the profiles is null
      if (
        profiles === null &&
        localStorage.getItem("bearer") !== undefined &&
        localStorage.getItem("bearer") !== null
      ) {
        // we have token but no active information
        this.sessionService.refreshToken().subscribe((token) => {
          this.legalEntitiesService.getLegalEntities();
        });
      }
    });
  }
}
