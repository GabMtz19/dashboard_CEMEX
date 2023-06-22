import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Application } from '../models/application.model';
import { BusinessLine } from '../models/business-line.model';
import { Customer } from '../models/customer.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserProfile } from '../models/user-profile.model';

export interface BusinessLinesState extends EntityState<string> {
  businessLines: BusinessLine[];
}

export function createInitialState(): BusinessLinesState {
  return {
    businessLines: null,
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'businessLines' })
export class BusinessLinesStore extends EntityStore<BusinessLinesState> {

    constructor() {
        super(createInitialState());
    }

    /**
     * this method saves businesslines of the current selected legal entity or client
     * 
     */
    public setBusinessLines(zbusinessLines: any) {
      this.update(state => ({
        ...state,
        businessLines: zbusinessLines,
      }));
    }
}
