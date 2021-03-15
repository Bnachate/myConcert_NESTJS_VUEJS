import * as mongoose from 'mongoose';

export const ConcertSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: [String],
    location: String,
    price: String,
    band: String,
    concert_hall: String,
    image_URL: String,
    genre: String,
    nbr_tickets: String,
    nbr_reservations: String,
    available: Boolean,
    created_at: { type: Date, default: Date.now }
})