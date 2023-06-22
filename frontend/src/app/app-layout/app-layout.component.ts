import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import {
  distinctUntilChanged,
  filter,
  map,
  take,
  takeUntil,
} from "rxjs/operators";

import { AlertInfo } from "../models/alert.model";
import { AlertQuery } from "../queries/alerts.query";
import { AnalyticsService } from "../services/analytics.service";
import { LegalEntity } from "../models/legal-entity.model";
import { LegalEntityQuery } from "../queries/legal-entity.queries";
import { LegalEntityStore } from "../states/legal-entity.store";
import { SessionService } from "../services/session.service";
import { Subject } from "rxjs";
import { UserQuery } from "../queries/user.queries";

@Component({
  selector: "app-app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.scss"],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  public updatedLegalEntities: LegalEntity[];
  public selectedLegalEntity: LegalEntity;
  private destroyNotifier$: Subject<void> = new Subject();
  public googleDataLayer: any;
  public alertInfo: AlertInfo;

  constructor(
    private legalEntityQ: LegalEntityQuery,
    private legalEntityStore: LegalEntityStore,
    private router: Router,
    private analytics: AnalyticsService,
    private userQuery: UserQuery,
    private sessionService: SessionService,
    private alertQuery: AlertQuery
  ) {
    this.googleDataLayer = (window as any).dataLayer || [];
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
        this.sessionService.refreshToken().pipe(take(1)).subscribe();
      }
    });
  }

  ngOnInit(): void {
    this.googleDataLayer = (window as any).dataLayer || [];
    this.legalEntityQ.selectAllLegalEntities$.subscribe((entities) => {
      this.updatedLegalEntities = entities;
    });
    this.legalEntityQ.selectActiveLegalEntity$.subscribe((entity) => {
      this.selectedLegalEntity = entity;
    });
    const trigger$ = this.legalEntityQ.selectActiveLegalEntity$.pipe(
      distinctUntilChanged(),
      filter((legalEntity) => !!legalEntity),
      map((legalEntity) => {
        // code here
      }),
      takeUntil(this.destroyNotifier$)
    );
    trigger$.subscribe();

    const alert$ = this.alertQuery.alertState$.pipe(
      map((alert) => {
        this.alertInfo = alert.info;
        if (alert.show) {
          this.triggerAlert();
        }
      })
    );
    alert$.subscribe();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // on loading
      }

      if (event instanceof NavigationEnd) {
        // on loaded
        this.analytics.trigger();
      }

      if (event instanceof NavigationError) {
        // on error
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
  }

  public triggerAlert() {
    (async () => {
      await customElements.whenDefined("cwc-alert");
      const cwcAlertElement = document.querySelector("cwc-alert");
      await cwcAlertElement.showAlert();
    })();
  }

  public activateLegalEntity(event: { detail: { entityId: string } }): void {
    const entityAux = this.updatedLegalEntities.filter(
      (entity) => entity.legalEntityId === +event.detail.entityId
    )[0];
    if (this.selectedLegalEntity.legalEntityId !== entityAux.legalEntityId) {
      this.legalEntityStore.setActiveLegalEntity(entityAux);
    }
  }

  public isActiveLegalEntity(legalEntityId: number): boolean {
    return legalEntityId === this.selectedLegalEntity.legalEntityId;
  }
}
