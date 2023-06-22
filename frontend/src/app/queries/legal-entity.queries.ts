import { LegalEntityState, LegalEntityStore } from '../states/legal-entity.store';
import { UserState, UserStore } from '../states/user.store';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class LegalEntityQuery extends QueryEntity<LegalEntityState> {

  selectActiveLegalEntity$ = this.select(state => {
    return state.selectedLegalEntity;
  });
  selectAllLegalEntities$ = this.select(state => {
    return state.legalEntities;
  });

  constructor(protected store: LegalEntityStore) {
    super(store);
  }

  resetLegalEntities() {
    this.store.reset();
  }
}
