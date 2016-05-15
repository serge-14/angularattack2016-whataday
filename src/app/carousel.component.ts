import {Component, OnInit, TemplateRef, ContentChild, Input, ElementRef,
    ViewChild, AfterViewInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChange } from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'carousel',
    templateUrl: 'app/carousel.component.html'
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    @ContentChild(TemplateRef)
    public itemTemplate: TemplateRef<any>;

    @Input()
    public items: any[];

    @Input()
    public activeId: any;
    private currentId: any;

    @ViewChild('carousel') carousel: ElementRef;

    @Output() slidedTo = new EventEmitter();
    private eventHandler: any = (e: any) => { this.keybardHandler(e); };

    constructor() {
    }

    ngAfterViewInit() {
        if (this.activeId !== undefined) {
            jQuery(this.carousel.nativeElement).find("[data-index='0']").addClass("active");
        } else {
            this.setActive(this.activeId);
        }

        jQuery(this.carousel.nativeElement).on('slide.bs.carousel', (event: any) => {
            if (event.relatedTarget === undefined) {
                event.relatedTarget = jQuery(this.carousel.nativeElement).find(".next");
                console.log("lost id. attempt to restore.");
            }
            if (event.relatedTarget === undefined) {
                console.log("lost id");
            } else {
                let dataIndex = event.relatedTarget.getAttribute('data-index');
                this.currentId = this.eventTrackBy(0, this.items[dataIndex]);
                this.slidedTo.emit({ value: this.items[dataIndex] });
            }
        });

        jQuery(document).bind('keyup', this.eventHandler);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }) {
        if (changes["activeId"] !== undefined && this.currentId !== this.activeId) {
            this.setActive(this.activeId);
        }
    }

    ngOnDestroy() {
        jQuery(document).unbind('keyup', this.eventHandler);
    }

    keybardHandler(e: any) {
        if (e.keyCode === 39) {
            jQuery(this.carousel.nativeElement).carousel('next');
        } else if (e.keyCode === 37) {
            jQuery(this.carousel.nativeElement).carousel('prev');
        }
    }

    eventTrackBy(index: any, item: any) {
        if (item.id === undefined) {
            throw "Item in carousel must have id";
        }
        return item.id;
    }

    setActive(id: string) {
        if (this.carousel) {
            let itemIndex = this.items.findIndex((x) => x.id === id);

            if (itemIndex !== -1) {
                jQuery(this.carousel.nativeElement).find(".active").removeClass("active");
                jQuery(this.carousel.nativeElement).find("[data-index='" + itemIndex + "']").addClass("active");
            } else {
                jQuery(this.carousel.nativeElement).find("[data-index='0']").addClass("active");
            }
        }
    }
}
