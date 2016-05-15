/**
 * Created by Renat on 14.05.2016.
 */

export class EventData {

    year: number;

    text: string;

    imageUrl: string;

    constructor(year: number, text: string, imageUrl: string) {
        this.year = year;
        this.text = text;
        this.imageUrl = imageUrl;
    }
}
