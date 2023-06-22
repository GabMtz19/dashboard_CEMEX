import { Application } from './application.model';

export interface User {
    uid: string;
    name: string;
    email: string;
    favorites:  {[key: number]: Application};
  }
