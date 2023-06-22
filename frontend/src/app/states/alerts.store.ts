import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AlertInfo } from '../models/alert.model';

export interface AlertState {
  show: boolean;
  info: AlertInfo;
}

export function createInitialState(): AlertState {
  return {
    show: false,
    info: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'alert' })
export class AlertStore extends Store<AlertState> {
  constructor() {
    super(createInitialState());
  }
}
