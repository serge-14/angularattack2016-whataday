import {Component, OnInit} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { ThemeType} from './app.component';
import {EventData} from './model/event.data';
import {EventType} from "./model/event.type";
import {ContentService} from "./content.service";
import {CarouselComponent} from './carousel.component';


@Component({
    selector:   'events',
    templateUrl: 'app/events.component.html',
    directives: [CarouselComponent]
})
export class EventsComponent implements OnInit, OnActivate {

    private current: ThemeType = ThemeType.Normal;
    private allEvents: Array<EventData>;
    private eventId: String;
    private monthNames: string[] = ["January", "February", "March", "April", "May", "June", // tslint:disable-line
        "July", "August", "September", "October", "November", "December" ];                 // tslint:disable-line
    private date: Date = new Date();
    private eventFilter: boolean[] = [true, false, false];// tslint:disable-line

    constructor(private _service: ContentService, private _router: Router) {};

    ngOnInit() {
        this._service.getData(EventType.Events, this.date).subscribe(
            data => this.allEvents = data,
            err => console.error(err)
        );
    }

    routerOnActivate(curr: RouteSegment): void {
        this.eventId = curr.getParam('eventId');
    }

    onBackClicked() {
        this._router.navigate(["/"]);
    }

    onSlided(event: any) {
        this.eventId = event.value.id;

        this.current++;

        if (this.current > ThemeType.Grey) {
            this.current = ThemeType.Normal;
        }

        // this.app.changeTheme(this.current);
    }

    swtichFilter(index: number) {
        this.eventFilter[index] = !this.eventFilter[index];
    }
}

