import { CmxAppState, CmxAppStore } from '../states/app.store';
import { LegalDocumentStore, LegalDocumentsState } from '../states/legal-documents.store';
import { UserState, UserStore } from '../states/user.store';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
	providedIn: 'root'
})
export class LegalDocumentsQuery extends QueryEntity<LegalDocumentsState> {
	constructor(protected store: LegalDocumentStore) {
		super(store);
	}
	selectLegalDocuments$ = this.select((state) => {
		return state.documents;
	});
	selectAgreementDocumentsToSign$ = this.select((state) => {
		return state.agreementToSign;
	});
	selectPrivacyDocumentsToSign$ = this.select((state) => {
		return state.privacyToSign;
	});
	selectCommitedSignature$ = this.select((state) => {
		return state.commitedSignature;
	});

}
