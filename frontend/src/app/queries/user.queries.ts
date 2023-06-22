import { UserState, UserStore } from '../states/user.store';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends QueryEntity<UserState> {

  selectUserProfile$ = this.select(state => {
    return state.profile;
  });
  selectUserRoles$ = this.select(state => {
    return state.applications;
  });
  selectUserCountry$ = this.select(state => {
    return state.country;
  });

  selectUserId$ = this.select(state => {
    return state.customerId;
  });
  constructor(protected store: UserStore) {
    super(store);
  }
}
