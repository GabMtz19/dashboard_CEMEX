import { filter, map, take, tap } from 'rxjs/operators';

import { BusinessLinesStore } from '../states/business-lines.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LegalEntity } from '../models/legal-entity.model';
import { LegalEntityQuery } from '../queries/legal-entity.queries';
import { LegalEntityResponse } from '../models/legal-entity-response.model';
import { LegalEntityState } from '../states/legal-entity.store';
import { environment } from 'src/environments/environment';

@Injectable()
export class BusinessLineService {
  constructor(
    private http: HttpClient,
    private legalEntityQueries: LegalEntityQuery,
    private businessLineStore: BusinessLinesStore
  ) {
    this.legalEntityQueries.selectActiveLegalEntity$
      .pipe(filter((values) => !!values))
      .subscribe((value) => {
        this.getBusinessLines(value as LegalEntity);
      });
  }

  public getBusinessLines(value: LegalEntity): any {
    console.log(value);
    // tslint:disable-next-line: max-line-length
    this.http
      .get(
        `https://${environment.host}/api/v4/sm/productlines?customerId=${value.legalEntityId}`
      )
      .subscribe((value: any) => {
        this.businessLineStore.setBusinessLines(value.productLines);
      });
  }
}

