import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import { provideHttpClient, withFetch  } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideNgxMask(),
    provideHttpClient(withFetch())
  ]
};
