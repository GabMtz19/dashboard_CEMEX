import { Pipe, PipeTransform } from '@angular/core';

import { LocaleQuery } from '../queries/locale.queries';

@Pipe({ name: 'formatNumber' })
export class FormatNumberPipe implements PipeTransform {
    private currentLang;
    constructor(private localeQuery: LocaleQuery) {
        this.localeQuery.selectLanguage$.subscribe( languageFormats => {
            this.currentLang = languageFormats;
        });
    }

  transform(value: number, decimalLimit = 2): string {
    if (isNaN(value)) {
        return '';
    }

    let decimal: string;
    if (decimalLimit) {
      decimal = value.toFixed(decimalLimit).replace('.', this.currentLang.decimalSeparator);
    } else {
      decimal = value.toString().replace('.', this.currentLang.decimalSeparator);
    }

    const parts = decimal.split(this.currentLang.decimalSeparator);
    parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.currentLang.thousandSeparator);
    decimal = parts.join(this.currentLang.decimalSeparator);

    return decimal;
  }
}
