import { CmxAppState, CmxAppStore } from '../states/app.store';
import { UserState, UserStore } from '../states/user.store';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
	providedIn: 'root'
})
export class CmxAppQuery extends QueryEntity<CmxAppState> {
	constructor(protected store: CmxAppStore) {
		super(store);
	}
	selectUserEmail$ = this.select((state) => {
		return state.email;
	});

	selectDeviceLanguage$ = this.select((state) => {
		return state.deviceLanguage;
	});

	selectUserLanguage$ = this.select((state) => {
		return state.userLanguage;
	});

	selectRTL$ = this.select((state) => {
		return state.isRTL;
	});
}
