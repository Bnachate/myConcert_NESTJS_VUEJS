import { Document } from 'mongoose';

export interface Hall extends Document {
    readonly name: string;
    readonly nb_places: string;
    readonly location: string;
    readonly description: string;
    readonly created_at: Date;
}