import { Document } from 'mongoose';

export interface Concert extends Document {
    readonly title: string,
    readonly description: string,
    readonly date: string[],
    readonly location: string,
    readonly price: string,
    readonly band: string,
    readonly concert_hall: string,
    readonly image_URL: string,
    readonly genre: string,
    readonly nbr_tickets: string,
    readonly nbr_reservations: string,
    readonly available: boolean,
    readonly created_at: Date
}