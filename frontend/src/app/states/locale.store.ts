import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';

import { Application } from '../models/application.model';
import { CmxAppStore } from './app.store';
import { Customer } from '../models/customer.model';
import { Injectable } from '@angular/core';
import { LocaleEnum } from '../enums/locale.enum';
import { User } from '../models/user.model';
import { UserProfile } from '../models/user-profile.model';

export interface LocaleState extends EntityState<string> {
  languages: any[];
  activeLanguage: any;
}

export function createInitialState(): LocaleState {
  return {
    languages: [],
    activeLanguage: {languageISO: 'en_US'},
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'cxlocale' })
export class LocaleStore extends EntityStore<LocaleState> {

    constructor(private appStore: CmxAppStore) {
        super(createInitialState());
    }

    /**
     * this method is called everytime a new language configuration
     * is downloaded to be part of the configurations array
     */
    public addLanguages(zlanguages: any) {
        this.update(state => ({
          ...state,
          languages: state.languages.concat(zlanguages)
        }));
      }
    /**
     * this method sets the language configuration in active position
     * @param languageISO string such as en_US or es_MX
     * the param can also be the country
     */
    public setActiveLanguage(languageISO: string) {
        const possibleLanguages = this.getValue().languages.filter( lang => lang.languageISO.includes(`_${languageISO}`)
                                                                    || lang.languageISO.includes(`${languageISO}`));
        // also update the correct language
        if (possibleLanguages.length > 0) {
            localStorage.setItem('language', possibleLanguages[0].languageISO);
            this.update( state => ({
                ...state,
                activeLanguage: possibleLanguages[0]
            }));
            // if the language is RTL notify to the application about the change
            const isRTL = possibleLanguages[0].textFloat === 'right' ? LocaleEnum.LANGUAGE_RTL : LocaleEnum.LANGUAGE_LTR;
            this.appStore.setRTL(isRTL);
            document.dir = isRTL === LocaleEnum.LANGUAGE_RTL ? 'rtl' : 'ltr';
        }
    }
}
