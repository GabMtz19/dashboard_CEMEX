import { Component, OnInit } from '@angular/core';

import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private translationService: TranslationService
  ) { }

  ngOnInit() {
  }

}
