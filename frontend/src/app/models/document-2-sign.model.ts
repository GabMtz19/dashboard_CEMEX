import { DocumentVersion } from './document-version.model';

export interface Document2Sign{
    countryCode: string;
    dataVersion: string;
    dateCreate: string;
    dateUpdate: string;
    documentCode: string;
    documentFormat: string;
    documentLanguage: string;
    documentLanguageId: number;
    htmlDocument: string;
    isLTR: boolean;
    userCreateCode: string;
    userUpdateCode: string;
    documentVersion: DocumentVersion;
}