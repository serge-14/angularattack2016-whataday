import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {AppComponent, ThemeType} from './app.component';

@Component({
    selector:   'events',
    templateUrl: 'app/events.component.html'
})
export class EventsComponent implements OnInit {

    constructor(
        @Inject(forwardRef(() => AppComponent)) private app: AppComponent) {
    }

    ngOnInit() {
        this.app.changeTheme(ThemeType.Normal);
    }
}
