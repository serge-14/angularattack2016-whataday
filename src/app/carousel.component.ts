import {Component, OnInit, TemplateRef, ContentChild, Input} from '@angular/core';

@Component({
    selector: 'carousel',
    templateUrl: 'app/carousel.component.html'
})
export class CarouselComponent implements OnInit {
    @ContentChild(TemplateRef)
    public itemTemplate: TemplateRef<any>;

    @Input()
    public items: any[];

    constructor() {
    }

    ngOnInit() {
    }

    addItem(object: any) {

    }
}
