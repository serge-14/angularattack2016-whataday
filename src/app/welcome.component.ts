import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {AppComponent, PageType, ThemeType} from './app.component';

@Component({
    selector:   'welcome',
    templateUrl: 'app/welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    constructor(
        @Inject(forwardRef(() => AppComponent)) private app: AppComponent) {
    }

    ngOnInit() {
        this.app.changeTheme(ThemeType.Normal);
    }

    onExploreClicked() {
        this.app.changePage(PageType.Events);
    }
}
