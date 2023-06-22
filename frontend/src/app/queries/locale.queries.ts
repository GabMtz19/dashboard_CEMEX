import { LocaleState, LocaleStore } from '../states/locale.store';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class LocaleQuery extends QueryEntity<LocaleState> {

  selectLanguage$ = this.select(state => {
    return state.activeLanguage;
  });
  availableLanguages$ = this.select(state => {
    return state.languages;
  });
  constructor(protected store: LocaleStore) {
    super(store);
  }
}
