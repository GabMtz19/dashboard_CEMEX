import { Injectable } from '@angular/core';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  //Constructor de arreglo de aplicaciones
  //Llave unica, nombre y liga
  applications: {[key: number]: [string, string]} = {};

  //Agregar a arreglo de aplicaciones
  addToApplications(index: number, name: string, link: string){
  	this.applications[index]=[name,link];
  }

  //Se obtienen las aplicaciones
  getApplications(){
  	return this.applications;
  }
  constructor() { }
}
