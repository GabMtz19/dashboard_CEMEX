import { LegalEntityType } from './legal-entity-type.model';

export interface LegalEntity{
    legalEntityType: LegalEntityType;
    legalEntityTypeCode: string;
    legalEntityId: number;
    legalEntityDesc: string;
    countryCode: string;
}