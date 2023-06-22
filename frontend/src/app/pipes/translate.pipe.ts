import { Pipe, PipeTransform } from '@angular/core';

import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) { }

  transform(value: any, args?: any): any {
    return this.translationService.getTranslation(value);
  }

}
