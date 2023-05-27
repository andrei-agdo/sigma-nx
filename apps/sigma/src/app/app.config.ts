
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  NoPreloading,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@sigma-nx/services/http';
import { ModalService } from '@sigma-nx/services/modal';
import { MatDialogModule } from '@angular/material/dialog';
import { EaglePreload } from '@core/route/EaglePreload.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(),
      withHashLocation(), withComponentInputBinding(),
      withPreloading(EaglePreload),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
      withRouterConfig({
        urlUpdateStrategy: 'eager',
        onSameUrlNavigation: 'reload'
      })),
    importProvidersFrom([BrowserAnimationsModule,HttpModule,ModalService,MatDialogModule,EaglePreload])
  ],
};
