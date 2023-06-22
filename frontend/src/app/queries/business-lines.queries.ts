import { BusinessLinesState, BusinessLinesStore } from '../states/business-lines.store';
import { CmxAppState, CmxAppStore } from '../states/app.store';
import { UserState, UserStore } from '../states/user.store';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
	providedIn: 'root'
})
export class BusinessLinesQuery extends QueryEntity<BusinessLinesState> {
	constructor(protected store: BusinessLinesStore) {
		super(store);
	}
	selectAllBusinessLines$ = this.select((state) => {
		return state.businessLines;
	});

}
