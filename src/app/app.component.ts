import {Component, provide, forwardRef, ChangeDetectorRef, OnInit} from '@angular/core';
import {WelcomeComponent} from './welcome.component';
import {EventsComponent} from './events.component';
import {ContentService, ContentServiceImpl} from "./content.service";
import {SocialComponent} from "./social.component";

export enum PageType {Welcome, Events};
export enum ThemeType {Normal, Green, Grey};

@Component({
    selector:   'my-app',
    templateUrl: 'app/app.component.html',
    directives: [forwardRef(() => WelcomeComponent), forwardRef(() => EventsComponent), SocialComponent],
    providers: [provide(ContentService, { useClass: ContentServiceImpl })]
})
export class AppComponent implements OnInit {

    private pageType = PageType; // tslint:disable-line
    private themeType = ThemeType; // tslint:disable-line

    private activeTheme: ThemeType = ThemeType.Normal;
    private activePage: PageType = PageType.Welcome;

    constructor(private cdr: ChangeDetectorRef) {

    }

    public changeTheme(theme: ThemeType) {
        if (this.activeTheme !== theme) {
            this.activeTheme = theme;
            this.cdr.detectChanges();
        }
    }

    ngOnInit() {
        setTimeout(() => { this.changePage(PageType.Events); }, 10000);
    }

    public changePage(page: PageType) {
        if (this.activePage !== page) {
            this.activePage = page;
        }
    }
}
