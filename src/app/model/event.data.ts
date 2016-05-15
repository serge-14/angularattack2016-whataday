/**
 * Created by Renat on 14.05.2016.
 */

export class EventData {

    id: string;

    year: number;

    text: string;

    imageUrl: string;

    constructor(id: string, year: number, text: string, imageUrl: string) {
        this.id = id;
        this.year = year;
        this.text = text;
        this.imageUrl = imageUrl;
    }
}
