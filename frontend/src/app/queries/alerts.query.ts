import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AlertInfo } from '../models/alert.model';
import { AlertState, AlertStore } from '../states/alerts.store';

@Injectable({ providedIn: 'root' })
export class AlertQuery extends Query<AlertState> {

  alertState$ = this.select();

  constructor(protected store: AlertStore) {
    super(store);
  }

  updateAlert(info: AlertInfo) {
    this.store.update({
      show: true,
      info,
    });
  }
}
