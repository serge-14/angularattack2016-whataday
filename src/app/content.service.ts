/**
 * Created by Renat on 14.05.2016.
 */
import { Injectable } from '@angular/core';
import { EventType } from './model/event.type';
import { EventData } from './model/event.data';

@Injectable()
export abstract class ContentService {

    abstract getData(type: EventType, date: Date): Promise<Array<EventData>>;

}

@Injectable()
export class ContentServiceImpl extends ContentService {

    format: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric'});

    getData(type: EventType, date: Date): Promise<Array<EventData>> {
        return new Promise(function(resolve, reject) {

            const xhr = new XMLHttpRequest();
            xhr.open('GET', ContentServiceImpl.makeUrl(type, date));
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            xhr.onload = (ev) => {
                if (xhr.status < 200 || xhr.status >= 300) {
                    reject(xhr.responseText);
                } else {
                    let json = JSON.parse(xhr.responseText);
                    resolve(ContentServiceImpl.makeEvents(json.events));
                }
            };
            xhr.onerror = (ev) => {
                reject('Unable to get data');
            };
            xhr.send(null);

        });
    }

    private static makeEvents(events: any[]): Array<EventData> {
        const result = [];
        for (const e of events) {
            const ed = new EventData(e.year, e.text, null);
            result.push(ed);
        }
        return result;
    }

    private static makeUrl(type: EventType, date: Date): string {
        const fullDate = date.toISOString();
        let strDate = fullDate.split('T')[0];
        const lt = ContentServiceImpl.getLiteral(type);
        return `https://attack-supplies.rhcloud.com/events?type=${lt}&date=${strDate}`;
    }

    private static getLiteral(type: EventType) {
        switch (type) {
            case EventType.Events:
                return 'EVENTS';
            case EventType.Births:
                return 'BIRTHS';
            case EventType.Deaths:
                return 'DEATHS';
            case EventType.Holidays:
                return 'HOLIDAYS';
        }
    }

}
