/**
 * Created by Renat on 14.05.2016.
 */
import {Injectable} from "@angular/core";
import {EventType} from "./model/event.type";
import {EventData} from "./model/event.data";
import {Http, Headers, RequestOptionsArgs, URLSearchParams, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";

@Injectable()
export abstract class ContentService {

    abstract getData(type: EventType, date: Date): Observable<Array<EventData>>;

}

@Injectable()
export class ContentServiceImpl extends ContentService {

    constructor(private _http: Http) {
        super();
    }

    getData(type: EventType, date: Date): Observable<Array<EventData>> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json; charset=UTF-8");
        return this._http.get("https://attack-supplies.rhcloud.com/events", {
                search: ContentServiceImpl.makeParams(type, date)
            } as RequestOptionsArgs)
            .delay(250)
            .map((res: Response) => {
                let json = res.json();
                return ContentServiceImpl.makeEvents(json.events);
            });
    }

    private static makeEvents(events: any[] = []): Array<EventData> {
        const result: Array<EventData> = [];
        for (const e of events) {
            const ed = new EventData(e.id, e.year, e.text, null);
            result.push(ed);
        }
        return result;
    }

    private static makeParams(type: EventType, date: Date): URLSearchParams {
        const fullDate = date.toISOString();
        let strDate = fullDate.split('T')[0];
        const lt = ContentServiceImpl.getLiteral(type);
        let params = new URLSearchParams();
        params.append("type", lt);
        params.append("date", strDate);
        return params;
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
