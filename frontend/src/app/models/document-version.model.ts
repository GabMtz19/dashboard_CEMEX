import { DocumentConfiguration } from './document-configuration.model';

export interface DocumentVersion {
    configuration: DocumentConfiguration;
    dataVersion: string;
    documentVersionDesc: string;
    documentVersionId: number;
    requireSignature: boolean;
    signatureInfo;
}