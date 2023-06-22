import { LegalDocument } from './document.model';
import { SignatureInfo } from './signature-info.model';

export interface DocumentConfiguration{
    document: LegalDocument;
    documentConfigurationId: number;
    signatureInfo: SignatureInfo;
}
