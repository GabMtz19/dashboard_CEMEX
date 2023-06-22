import { HttpClient, HttpParams } from '@angular/common/http';

import { CmxAppStore } from '../states/app.store';
import { Injectable } from '@angular/core';
import { LocaleStore } from '../states/locale.store';
import { OAuth2 } from '../models/oauth2.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class SessionService {

    constructor(private http: HttpClient,
                private appStore: CmxAppStore) {
    }
    /**
     * This method brings the language configurations for amrica
     */
    public refreshToken() {
        const payload = new HttpParams()
            .set('grant_type', 'refresh_token')
            .set('refresh_token', localStorage.getItem('refresh_token'))
            .set('scope', 'security')
            .set('app_name', 'DCM')
            .set('userinformation', 'false')
            .set('include', 'userinfo,profile,applications,roles,customers,oldVersion');

        return this.http.post<any>(`https://${environment.host}/api/v2/secm/oam/oauth2/token`, payload).pipe(
            tap((oauth: OAuth2) => {
            this.appStore.setTokens(localStorage.getItem('jwt'), oauth);
        }));
    }
}
