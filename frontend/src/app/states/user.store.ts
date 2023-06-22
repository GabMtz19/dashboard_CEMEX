import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Application } from '../models/application.model';
import { Customer } from '../models/customer.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserProfile } from '../models/user-profile.model';

export interface UserState extends EntityState<User, string> {
  isLogged: boolean;
  applications: Application[];
  customer: Customer;
  customerId: number;
  profile: UserProfile;
}

export function createInitialState(): UserState {
  return {
    isLogged: false,
    applications: [],
    customer: null,
    customerId: 0,
    profile: null
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState> {

    constructor() {
        super(createInitialState());
    }

    /**
     * this method saves common information from the user into the state of the active session
     * 
     * @param application 
     * @param customers 
     * @param customerIds 
     * @param profiles 
     */
    public setUser(application: any, customers: any, customerIds: number, profiles: any, country: any) {
      this.update(state => ({
        ...state,
        isLogged: true,
        applications: application,
        customer: customers,
        customerId: customerIds,
        profile: profiles,
        country: country
      }));
    }

    /**
     * resets user details for logging out
     */
    public cleanUser() {
      createInitialState();
    }
}
