import { ContentService, ContentServiceImpl } from './content.service';

import {
    expect, it,
    describe, beforeEachProviders,
    async, inject
} from '@angular/core/testing';

import { provide }        from '@angular/core';
import {EventType} from './model/event.type';

beforeEachProviders(() => [
    provide(ContentService, {useValue: new ContentServiceImpl()})
]);

describe('Smoke test', () => {
    it('should fetch data',
        async(inject([ContentService], (cs: ContentService) => {
            cs.getData(EventType.Events, new Date(2016, 4, 6)).then(result => {
                expect(result.length).toBeGreaterThan(0);
            });
    })));

    it('should fetch exact data',
        async(inject([ContentService], (cs: ContentService) => {
            cs.getData(EventType.Births, new Date(2016, 4, 6)).then(result => {
                expect(result.length).toBe(50);
            });
        })));
});
