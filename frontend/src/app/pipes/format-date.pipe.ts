import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

import { LocaleQuery } from '../queries/locale.queries';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
    private formatDate;
  constructor(private localeQuery: LocaleQuery) {
      this.localeQuery.selectLanguage$.subscribe( languageFormats => {
          this.formatDate = languageFormats.formatDate;
      });
  }

  transform(date: any): string {
      if (localStorage.getItem('language')) {
        moment.locale(localStorage.getItem('language').substr(0, 2));
    }

    // No difference in the code when moment.js locales are removed from the equation.
      return moment.utc(date).format(this.formatDate);
  }
}
