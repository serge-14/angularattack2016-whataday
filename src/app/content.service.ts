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

        let resultResolve: (value?: any) => void;
        let resultReject: (error?: any) => void;

        const result = new Promise((resolve: (value?: any) => void, reject: (error?: any) => void) => {
            resultResolve = resolve;
            resultResolve = reject;
        });

        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.makeUrl(type, date));
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = (ev) => {
            if (xhr.status < 200 || xhr.status >= 300) {
                let json = JSON.parse(xhr.responseText);
                resultResolve(this.makeEvents(json.events));
            } else {
                resultReject(xhr.responseText);
            }
        };
        xhr.onerror = (ev) => {
            resultReject('Unable to get data');
        };
        xhr.send(null);
        return result;
    }

    private makeEvents(events: any[]): Array<EventData> {
        const result = [];
        for (const e of events) {
            const ed = new EventData(e.year, e.text, null);
            result.push(ed);
        }
        return result;
    }

    private makeUrl(type: EventType, date: Date): string {
        const fullDate = date.toISOString();
        let strDate = fullDate.split('T')[0];
        const lt = this.getLiteral(type);
        return `https://attack-supplies.rhcloud.com/events?type=${lt}&date=${strDate}`;
    }

    private getLiteral(type: EventType) {
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
