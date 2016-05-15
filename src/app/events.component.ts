import {Component, OnInit, Inject, forwardRef} from '@angular/core';
import {AppComponent, ThemeType} from './app.component';
import {EventData} from './model/event.data';
import {EventType} from "./model/event.type";
import {ContentService} from "./content.service";
import {CarouselComponent} from './carousel.component';


@Component({
    selector:   'events',
    templateUrl: 'app/events.component.html',
    directives: [CarouselComponent]
})
export class EventsComponent implements OnInit {

    private allEvents: Array<EventData>;
    private monthNames: string[] = ["January", "February", "March", "April", "May", "June", // tslint:disable-line
        "July", "August", "September", "October", "November", "December" ];                 // tslint:disable-line
    private date: Date = new Date();

    constructor(
        private _service: ContentService,
        @Inject(forwardRef(() => AppComponent)) private app: AppComponent) {};

    ngOnInit() {
        this._service.getData(EventType.Events, this.date).then((events: Array<EventData>) => {
            this.allEvents = events;
        });

        this.app.changeTheme(ThemeType.Normal);
    }
}

