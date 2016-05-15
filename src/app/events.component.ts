import {Component, OnInit, Inject, forwardRef} from '@angular/core';
import {AppComponent, ThemeType, PageType} from './app.component';
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

    private current: ThemeType = ThemeType.Normal;
    private allEvents: Array<EventData>;
    private monthNames: string[] = ["January", "February", "March", "April", "May", "June", // tslint:disable-line
        "July", "August", "September", "October", "November", "December" ];                 // tslint:disable-line
    private date: Date = new Date();

    constructor(
        private _service: ContentService,
        @Inject(forwardRef(() => AppComponent)) private app: AppComponent) {};

    ngOnInit() {
        this._service.getData(EventType.Events, this.date).subscribe(
            data => this.allEvents = data,
            err => console.error(err)
        );
        this.app.changeTheme(ThemeType.Normal);
    }

    onBackClicked() {
        this.app.changePage(PageType.Welcome);
    }

    onSlided(event: any) {

        console.log(event.value.id);

        this.current++;

        if (this.current > ThemeType.Grey) {
            this.current = ThemeType.Normal;
        }

        this.app.changeTheme(this.current);
    }
}

