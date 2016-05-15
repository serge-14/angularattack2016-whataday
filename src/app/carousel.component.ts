import {Component, OnInit, TemplateRef, ContentChild, Input, ElementRef,
    ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'carousel',
    templateUrl: 'app/carousel.component.html'
})
export class CarouselComponent implements OnInit, AfterViewInit {
    @ContentChild(TemplateRef)
    public itemTemplate: TemplateRef<any>;

    @Input()
    public items: any[];

    @ViewChild('carousel') carousel: ElementRef;

    @Output() slidedTo = new EventEmitter<any>();

    constructor() {
    }

    ngAfterViewInit() {
        jQuery(this.carousel.nativeElement).carousel({
            interval: 8000
        });

        jQuery(this.carousel.nativeElement).on('slide.bs.carousel', () => {
            this.slidedTo.emit(null);
        });
    }

    ngOnInit() {
    }

    addItem(object: any) {
    }
}
