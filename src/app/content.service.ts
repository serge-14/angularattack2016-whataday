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
        xhr.open('GET', this.makeUrl(date));
        xhr.onload = (ev) => {
            if (xhr.status < 200 || xhr.status >= 300) {
                resultReject(xhr.responseText);
            }
            resultResolve(this.parseResponse(xhr.responseText, type));
        };
        xhr.onerror = (ev) => {
            resultReject('Unable to get data');
        };
        xhr.send(null);
        return result;
    }

    private parseResponse(responseText: string, type: EventType): Array<EventData> {
        const token = ContentServiceImpl.getToken(type);
        const start = responseText.indexOf(token);
        if (start < 0) {
            return [];
        } else  {
            const text = responseText.substr(start);
            let lines = text.split('\n');
            lines = lines.splice(1); // remove section title
            let result = new Array<EventData>();
            for (let line of lines) {
                line = line.trim();
                if (line === '') {
                    break;
                } else {
                    const data = this.makeData(type, line);
                    if (data !== null) {
                        result.push(data);
                    }
                }
            }
            return result;
        }
    }

    private makeData(type: EventType, line: string) {
        const ndash = line.indexOf('&ndash;');
        if (ndash < 0) {
            return null;
        }
        const year = parseInt(this.dropBrackets(line.substr(1, ndash)), 10);
        const restLine = line.substr(ndash + 7);
        return new EventData(type, year, this.dropBrackets(restLine), null);

    }

    private dropBrackets(str: string): string {
        const regexp = /(.*)[[(.*)]](.*)/;
        const result = regexp.exec(str);
        if (result.index > 0) {
            const int_res = result[1] + ContentServiceImpl.takeFirst(result[2]) + result[3];
            return this.dropBrackets(int_res);
        }
        return str;
    }

    private static takeFirst(str: string) {
        const index = str.indexOf('|');
        if (index > 0) {
            return str.substr(0, index);
        }
        return str;
    }

    private static getToken(type: EventType): string {
        switch (type) {
            case EventType.Events:
                return '==Events==';
            case EventType.Births:
                return '==Births==';
            case EventType.Deaths:
                return '==Deaths==';
            case EventType.Holidays:
                return '==Holidays and observances==';
        }
    }

    private makeUrl(date: Date): string {
        let strDate = this.format.format(date);
        strDate = strDate.replace(/ /g, '_');
        return 'https://en.wikipedia.org/wiki/' + strDate + '?action=raw';
    }

}
