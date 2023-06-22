import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Application } from '../models/application.model';
import { Customer } from '../models/customer.model';
import { Document2Sign } from '../models/document-2-sign.model';
import { DocumentVersion } from '../models/document-version.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserProfile } from '../models/user-profile.model';

export interface LegalDocumentsState extends EntityState<string> {
  documents: DocumentVersion[];
  agreementToSign: Document2Sign[];
  privacyToSign: Document2Sign[];
  commitedSignature: boolean;
}

export function createInitialState(): LegalDocumentsState {
  return {
    documents: null,
    agreementToSign: null,
    privacyToSign: null,
    commitedSignature: false,
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'legaldocs' })
export class LegalDocumentStore extends EntityStore<LegalDocumentsState> {

    constructor() {
        super(createInitialState());
    }

    /**
     * this method saves common information from the user into the state of the active session
     * 
     * @param docs legal documentss
     */
    public setDocuments(docs: DocumentVersion[]) {
      this.update(state => ({
        ...state,
        documents: docs,
      }));
    }

    /**
     * this method saves common information from the user into the state of the active session
     * 
     * @param docs legal documents to sign
     */
    public setAgreement2Sign(docs: Document2Sign[]) {
      this.update(state => ({
        ...state,
        agreementToSign: docs,
      }));
    }

    /**
     * this method saves common information from the user into the state of the active session
     * 
     * @param docs legal documents to sign
     */
    public setPrivacy2Sign(docs: Document2Sign[]) {
      this.update(state => ({
        ...state,
        privacyToSign: docs,
      }));
    }

    /**
     * this method saves the latest signature accepted and saved from terms
     * 
     * @param docs legal documents to sign
     */
    public commitedSignature(signature: boolean) {
      this.update(state => ({
        ...state,
        commitedSignature: signature,
      }));
    }
}
