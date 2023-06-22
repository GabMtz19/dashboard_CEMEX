import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FavoriteService } from "src/app/services/favorite.service"
import { Url } from 'url';
import { UserProfile } from 'src/app/models/user-profile.model';
import { UserQuery } from "src/app/queries/user.queries";
import {createIntl, createIntlCache} from '@formatjs/intl'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {
	url: any; //Angular 11, for stricter type
  constructor(
  	private userQuery: UserQuery,
    private favoriteService: FavoriteService
  ) { 
	this.url = ('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png');
  }
  cache = createIntlCache()

  intl = createIntl(
	{
	    locale: 'en-US',
	    messages: {},
    },
  this.cache
  )
  title = 'User ';
  userP:UserProfile;
  countryCode:string;
  country:string;
  ngOnInit(): void {
  	this.userQuery.selectUserProfile$.subscribe((profile) => (this.userP = profile));
  	this.userQuery.selectUserCountry$.subscribe((co) => {
  		this.countryCode = co;
  		console.log(this.countryCode);
  	});
  }
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.url = new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png");
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.url = new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png");
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			//this.msg = null;
			this.url = reader.result; 
		}
	}

  /*favorited = this.favoriteService.getFavorites();
  fKeys = Object.keys(this.favorited);
  fVals = Object.values(this.favorited);*/

}
