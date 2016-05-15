import {Component, OnInit} from '@angular/core';

@Component({
    selector:   'carousel',
    template: '<p>{{text}}</p>'
})
export class CarouselItemComponent implements OnInit {

    public text: String;

    constructor() {
    }

    ngOnInit() {

    }
}
