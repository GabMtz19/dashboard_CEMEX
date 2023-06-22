import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const persistStateInstance = persistState({storage: sessionStorage, include: ['legalentity', 'cxlocale']});
const providers = [{ provide: 'persistStorage', useValue: persistStateInstance }];
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.error(err));
