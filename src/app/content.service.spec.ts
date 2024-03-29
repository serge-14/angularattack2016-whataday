import { ContentService, ContentServiceImpl } from './content.service';
import { HTTP_PROVIDERS } from '@angular/http';

import {
    expect, it,
    describe, beforeEachProviders,
    async, inject
} from '@angular/core/testing';

import { provide }        from '@angular/core';
import {EventType} from './model/event.type';


describe('Smoke test', () => {
    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        provide(ContentService, {useClass: ContentServiceImpl})
    ]);

    it('should fetch data',
        async(inject([ContentService], (cs: ContentService) => {
            cs.getData(EventType.Events, new Date(2016, 4, 6)).subscribe(
                result => {
                    expect(result).not.toBeUndefined();
                    expect(result.length).toBeGreaterThan(0);
                },
                err => expect(false).toBe(true, err)
            );
    })));

    it('should fetch exact data',
        async(inject([ContentService], (cs: ContentService) => {
            cs.getData(EventType.Births, new Date(2016, 4, 6)).subscribe(
                result => {
                    expect(result).not.toBeUndefined();
                    expect(result.length).toBe(194);
                },
                err => expect(false).toBe(true, err)
            );
        })));

    it('should fetch data in proper format',
        async(inject([ContentService], (cs: ContentService) => {
            cs.getData(EventType.Deaths, new Date(2016, 4, 6)).subscribe(
                result => {
                    expect(result).not.toBeUndefined();
                    let first = result[0];
                    expect(first.text).toBe('Engelbrekt Engelbrektsson, Swedish rebel leader (b. 1390)');
                    expect(first.year).toBe(1436);
                    expect(first.id).toBe('00000000-0000-059c-ffff-ffffef96fc8f');
                },
                err => expect(false).toBe(true, err)
            );
        })));
});
