import { LegalEntity } from './legal-entity.model';

export interface LegalEntityResponse{
    count: number;
    legalEntities: LegalEntity[];
    totalCount: number;
}
