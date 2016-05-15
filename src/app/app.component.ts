import {Component, forwardRef} from '@angular/core';
import {WelcomeComponent} from './welcome.component';
import {EventsComponent} from './events.component';

export enum PageType {Welcome, Events};
export enum ThemeType {Normal, Green, Grey};

@Component({
    selector:   'my-app',
    templateUrl: 'app/app.component.html',
    directives: [forwardRef(() => WelcomeComponent), forwardRef(() => EventsComponent)]
})
export class AppComponent {

    private pageType = PageType; // tslint:disable-line
    private themeType = ThemeType; // tslint:disable-line

    private activeTheme: ThemeType = ThemeType.Normal;
    private activePage: PageType = PageType.Welcome;

    public changeTheme(theme: ThemeType) {
        if (this.activeTheme !== theme) {
            this.activeTheme = theme;
        }
    }

    public changePage(page: PageType) {
        if (this.activePage !== page) {
            this.activePage = page;
        }
    }
}
