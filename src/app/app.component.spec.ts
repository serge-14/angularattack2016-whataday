/* tslint:disable:no-unused-variable */
import { AppComponent, ThemeType } from './app.component';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders, setBaseTestProviders,
  async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide, ComponentResolver }        from '@angular/core';

import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {ROUTER_FAKE_PROVIDERS} from '@angular/router/testing';
import {RootRouter} from '@angular/router-deprecated/src/router';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';


////////  SPECS  /////////////

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

beforeEachProviders(() => [
    ROUTER_FAKE_PROVIDERS
]);


describe('AppComponent with TCB', function () {

  it('should instantiate component',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.createAsync(AppComponent).then(fixture => {
      expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
  })));

  it('should have expected <div>',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb.createAsync(AppComponent).then(fixture => {
      // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding

      let div = fixture.debugElement.query(el => el.name === 'div').nativeElement;  // it works

          div = fixture.debugElement.query(By.css('div')).nativeElement;            // preferred

      expect(div.innerText).toMatch('');
    });

  })));
});
