import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt, 'pt');

export const CurrencyList = [
  {
    provide: LOCALE_ID,
    useValue: 'pt-BR',
  },
  {
    provide: LOCALE_ID,
    useValue: 'en-GB',
  },
  {
    provide: LOCALE_ID,
    useValue: 'en',
  },
  {
    provide: LOCALE_ID,
    useValue: 'es-AR',
  },
  {
    provide: LOCALE_ID,
    useValue: 'pt-PT',
  },
  {
    provide: LOCALE_ID,
    useValue: 'en-CA',
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL',
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'USD',
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'CAD',
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'EUR',
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'ARS',
  },
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'GBP',
  },
];
