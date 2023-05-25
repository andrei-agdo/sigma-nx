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
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(),
      withHashLocation(), withComponentInputBinding(),
      withPreloading(NoPreloading),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
      withRouterConfig({
        urlUpdateStrategy: 'eager',
        onSameUrlNavigation: 'reload'
      })),
    importProvidersFrom([BrowserAnimationsModule,HttpClientModule])
  ],
};
