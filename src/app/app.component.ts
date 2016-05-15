import {Component, provide, ChangeDetectorRef, OnInit} from "@angular/core";
import {Routes, Router, ROUTER_DIRECTIVES} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";
import {EventsComponent} from "./events.component";
import {ContentService, ContentServiceImpl} from "./content.service";
import {SocialComponent} from "./social.component";

export enum ThemeType {Normal, Green, Grey}

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [WelcomeComponent, EventsComponent, SocialComponent, ROUTER_DIRECTIVES],
    providers: [provide(ContentService, {useClass: ContentServiceImpl})]
})
@Routes([
    { path: '/event/:eventId', component: EventsComponent },
    { path: '/', component: WelcomeComponent }
])
export class AppComponent implements OnInit {

    private themeType = ThemeType; // tslint:disable-line

    private activeTheme: ThemeType = ThemeType.Normal;

    constructor(private cdr: ChangeDetectorRef, private _router: Router) {

    }

    public changeTheme(theme: ThemeType) {
        if (this.activeTheme !== theme) {
            this.activeTheme = theme;
            this.cdr.detectChanges();
        }
    }

    ngOnInit() {
        this._router.changes.subscribe(() => {
            const root = this._router.urlTree.root;
            const selected = this._router.urlTree.firstChild(root);
            if (selected === null) {
                this.changeTheme(ThemeType.Normal);
            } else {
/*                const path = selected.segment;
                if (path === "event") {
                    this.changeTheme(ThemeType.Green);
                }*/
            }
        });
        setTimeout(() => {
            this._router.navigate(["/event/"]);
        }, 10000);
    }

}
