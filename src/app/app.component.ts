import {Component} from '@angular/core';

@Component({
    selector:   'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {

    private themeName: String = '';

    get isGreenTheme(): boolean {
        return this.themeName === 'green';
    }

    get isGreyTheme(): boolean {
        return this.themeName === 'grey';
    }

    public changeTheme(nextTheme: String) {
        if (this.themeName !== nextTheme) {
            this.themeName = nextTheme;
        }
    }
}
