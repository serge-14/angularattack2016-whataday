///<reference path="../../typings/browser/ambient/es6-shim/index.d.ts"/>

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {Production} from './enviroment';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

if (Production) {
    enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
