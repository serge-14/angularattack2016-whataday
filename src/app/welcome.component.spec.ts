/* tslint:disable:no-unused-variable */
import { WelcomeComponent } from './welcome.component';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

////////  SPECS  /////////////

describe('WelcomeComponent with new', function () {
  it('should instantiate component', () => {
    expect(new WelcomeComponent(null)).toBeDefined('Whoopie!');
  });
});