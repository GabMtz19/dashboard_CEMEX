import { Application } from '../models/application.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  matches: {[key: number]: Application} = {};

  addToMatches(app: Application){
  	this.matches[app.applicationId]=app;
  }

  removeFromMatches(index: number){
  	delete this.matches[index];
  }

  removeall() {
      for(var index in this.matches) {
        delete this.matches[index];
      }
  }

  getMatches(){
  	return this.matches;
  }
  constructor() { }
}
