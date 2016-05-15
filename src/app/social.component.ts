import {Component} from '@angular/core';

export enum Types {
    FACEBOOK, TWITTER, GOOGLE_PLUS, PINTREST, REDDIT
}

@Component({
    selector:   'whataday-social',
    templateUrl: 'app/social.component.html'
})
export class SocialComponent {

    currentPage: string = "https://whataday.2016.angularattack.io/";

    currentTitle: string = "What A Day";

    socials: Array<Types> = [ Types.TWITTER, Types.FACEBOOK, Types.GOOGLE_PLUS, Types.PINTREST, Types.REDDIT ];

    getClass(type: Types): string {
        switch (type) {
            case Types.TWITTER:
                return "fa fa-twitter";
            case Types.FACEBOOK:
                return "fa fa-facebook";
            case Types.GOOGLE_PLUS:
                return "fa fa-google-plus";
            case Types.PINTREST:
                return "fa fa-pinterest";
            case Types.REDDIT:
                return "fa fa-reddit";
        }
    }

    linkClick(type: Types): boolean {
        let url = this.getUrl(type);
        if (url !== null) {
            window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        }
        return false;
    }

    private getUrl(type: Types) {
        switch (type) {
            case Types.FACEBOOK:
                return `http://www.facebook.com/share.php?u=${this.currentPage}&title=${this.currentTitle}`;
            case Types.TWITTER:
                return `http://twitter.com/home?status=${this.currentTitle}+${this.currentPage}`;
            case Types.GOOGLE_PLUS:
                return `https://plus.google.com/share?url=${this.currentPage}`;
            case Types.PINTREST:
                return `http://pinterest.com/pin/create/link/?url=${this.currentPage}`;
            case Types.REDDIT:
                return `http://www.reddit.com/submit?url=${this.currentPage}&title=${this.currentTitle}`;
        }
        return null;
    }
}
