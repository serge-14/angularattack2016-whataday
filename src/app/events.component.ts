import {Component, OnInit, Inject, forwardRef} from '@angular/core';
import {AppComponent, ThemeType} from './app.component';
import {EventData} from './model/event.data';
import {EventType} from "./model/event.type";
import {ContentService} from "./content.service";


@Component({
    selector:   'events',
    templateUrl: 'app/events.component.html'
})
export class EventsComponent implements OnInit {

    private allEvents: Array<EventData>;

    private currentEvent: EventData;

    private currentEventIndex: number = 0; // tslint:disable-line

    constructor(private _service: ContentService, @Inject(forwardRef(() => AppComponent)) private app: AppComponent) {};

    ngOnInit() {
        this._service.getData(EventType.Events, new Date()).then((events: Array<EventData>) => {
            this.allEvents = events;
            this.currentEvent = events[0];
        });
        this.app.changeTheme(ThemeType.Normal);
    }
}

