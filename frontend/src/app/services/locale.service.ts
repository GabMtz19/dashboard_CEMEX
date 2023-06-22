import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocaleStore } from '../states/locale.store';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: "root" })
export class LocaleService {
  constructor(private http: HttpClient, private localeStore: LocaleStore) {}
  /**
   * This method brings the language configurations for amrica
   */
  public getLanguageConfigAME(): any {
    this.http
      .get(`https://uscldonswacxgop01.azurewebsites.net/translate/getLanguages`)
      .subscribe((langs) => {
        this.localeStore.addLanguages(langs);
      });
  }
  /**
   * This method brings the configuration for european languages
   */
  public getLanguageConfigEU(): any {
    this.http
      .get(`https://ukcldcnxwacxgop01.azurewebsites.net/translate/getLanguages`)
      .subscribe((langs) => {
        this.localeStore.addLanguages(langs);
      });
  }
//   public getLanguageConfigs(): void {
//     this.getLanguageConfigAME();
//     this.getLanguageConfigEU();
//   }
  /**
   * this method will populate the configurations for all the languages and save them in the store
   * for future refrence when changing languages
   */
  public getLanguageConfigs(): void {
    this.localeStore.addLanguages(window["CMX_LANGUAGES"]);
  }
}
