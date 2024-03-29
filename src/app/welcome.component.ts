import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector:   'welcome',
    templateUrl: 'app/welcome.component.html'
})
export class WelcomeComponent {

    constructor(private _router: Router) {
    }

    onExploreClicked() {
        this._router.navigate(["/event"]);
    }
}
