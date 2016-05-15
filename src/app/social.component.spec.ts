import { SocialComponent } from './social.component';

import {
    expect, it,
    describe,
    async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';


describe('Social component', function () {

    it('should instantiate component',
        async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

            tcb.createAsync(SocialComponent).then(fixture => {
                expect(fixture.componentInstance instanceof SocialComponent).toBe(true, 'should create SocialComponent');
            });
        })));

});
