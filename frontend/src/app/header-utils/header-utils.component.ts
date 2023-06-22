import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'

import { AnalyticsService } from '../services/analytics.service';
import { CmxAppStore } from '../states/app.store';
import { TranslationService } from '../services/translation.service';
import { UserStore } from '../states/user.store';

@Component({
  selector: 'app-header-utils',
  templateUrl: './header-utils.component.html',
  styleUrls: ['./header-utils.component.scss']
})
export class HeaderUtilsComponent implements OnInit {


  learningCenterModalVisible: boolean = false;
  helpOverlayVisible: boolean = false;

  constructor(
    private translationService: TranslationService,
    private appStore: CmxAppStore,
    private userStore: UserStore,
    private analytics: AnalyticsService,
    private router:Router,
  ) { }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  openLearningCenterModal(e) {
    // hide the overlay
    this.helpOverlayVisible = false;

    // open the modal
    if (!this.learningCenterModalVisible) {
      this.learningCenterModalVisible = true;
    } else {
      this.learningCenterModalVisible = false;
    }
  }

  cwcClose(e) {
    this.learningCenterModalVisible = false;
  }
  public logout() {
    this.analytics.triggerCustom('logout');
    this.appStore.logout();
    this.userStore.cleanUser();
    // force clean the browser to avoid problems with the
    // RTL languages
    window.location.href = '/login';
  }

  ngOnInit() {
  }

}
