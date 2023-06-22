import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LegalEntityResponse } from '../models/legal-entity-response.model';
import { LegalEntityStore } from '../states/legal-entity.store';
import { environment } from 'src/environments/environment';

@Injectable()
export class LegalEntityService {
    constructor(
        private http: HttpClient,
        private legalEntityState: LegalEntityStore
    ) {
            //
    }

    public getLegalEntities(): any {
        const endpoint = `https://${environment.host}/api/v5/sm/mylegalentities?fetch=0&page=0`;
        this.http.get(endpoint).subscribe((value: LegalEntityResponse) => {
            this.legalEntityState.setLegalEntities(value.legalEntities);
            // TODO: change the default legal entity next time user interacts with the menu
            this.legalEntityState.setActiveLegalEntity(value.legalEntities[0]);
        });
    }
}
