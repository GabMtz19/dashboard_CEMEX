import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user.model"
import { Application } from '../models/application.model';



const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})


export class FavoriteService {
  private apiUrl = "http://localhost:5000/api"
  constructor(private http: HttpClient) {}
  addToFavorites(user: User, app: Application): Observable<User>{
    return this.http.post<User>(this.apiUrl + '/addFavorite/' + user.uid, {[app.applicationId]: app}, options);
  	
  }

  removeFromFavorites(user: User, id: number): Observable<User>{
  
    return this.http.post<User>(this.apiUrl+"/removeFavorite/" + user.uid, {["favorites."+id]: ""}, options)

  }

  getFavorites(id: string): Observable<User>{
  	 return this.http.get<User>(this.apiUrl+"/favorites/"+id);
  }
}
