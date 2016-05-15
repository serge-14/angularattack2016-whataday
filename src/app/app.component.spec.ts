/* tslint:disable:no-unused-variable */
import { AppComponent, PageType, ThemeType } from './app.component';

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

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('AppComponent with new', function () {
  it('should instantiate component', () => {
    expect(new AppComponent()).toBeDefined('Whoopie!');
  });
});

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

  it('should change theme to green',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb.createAsync(AppComponent).then(fixture => {
        (<AppComponent>fixture.componentInstance).changeTheme(ThemeType.Green);

        const element = fixture.debugElement.nativeElement;

        expect(element).toHaveClass('green');
    });

  })));
});
