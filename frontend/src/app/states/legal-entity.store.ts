import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Application } from '../models/application.model';
import { Customer } from '../models/customer.model';
import { Injectable } from '@angular/core';
import { LegalEntity } from '../models/legal-entity.model';
import { User } from '../models/user.model';
import { UserProfile } from '../models/user-profile.model';

export interface LegalEntityState extends EntityState<string> {
    legalEntities: LegalEntity[];
    selectedLegalEntity: LegalEntity;
}

export function createInitialState(): LegalEntityState {
    return {
        legalEntities: null,
        selectedLegalEntity: null,
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'legalentity', resettable: true })
export class LegalEntityStore extends EntityStore<LegalEntityState> {

    constructor() {
        super(createInitialState());
    }

    /**
     * sets all the legal entities into the application state for usage in
     * the application livecycle
     */
    public setLegalEntities(customers: LegalEntity[]) {
        this.update(state => ({
            ...state,
            legalEntities: customers
        }));
    }

    /**
     * this method saves a copy of a legal entity to be used as working customer across the active selection
     * @param customer a LegalEntity type
     */
    public setActiveLegalEntity(customer: LegalEntity) {
        this.update(state => ({
            ...state,
            selectedLegalEntity: customer
        }));
    }
}
