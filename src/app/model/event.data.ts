/**
 * Created by Renat on 14.05.2016.
 */

import { EventType } from './event.type';

export class EventData {

    type: EventType;

    year: number;

    text: string;

    imageUrl: string;

    constructor(type: EventType, year: number, text: string, imageUrl: string) {
        this.type = type;
        this.year = year;
        this.text = text;
        this.imageUrl = imageUrl;
    }
}
