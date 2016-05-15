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

    @Output() slidedTo = new EventEmitter();

    constructor() {
    }

    ngAfterViewInit() {
        jQuery(this.carousel.nativeElement).carousel({
            interval: 8000
        });

        jQuery(this.carousel.nativeElement).find("[data-index='0']").addClass("active");

        jQuery(this.carousel.nativeElement).on('slide.bs.carousel', (event: any) => {
            let dataIndex = event.relatedTarget.getAttribute('data-index');
            this.slidedTo.emit({ value: this.items[dataIndex] });
        });
    }

    ngOnInit() {
    }

    eventTrackBy(index: any, item: any) {
        if (item.id === undefined) {
            throw "Item in carousel must have id";
        }
        return item.id;
    }

    setActive(id: string) {

        let itemIndex = this.items.findIndex((x) => x.id === id);

        if (itemIndex !== -1) {
            jQuery(this.carousel.nativeElement).find(".active").removeClass("active");
            jQuery(this.carousel.nativeElement).find("[data-index='" + itemIndex + "']").addClass("active");
        }
    }
}
