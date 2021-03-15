import * as mongoose from 'mongoose';

export const BandSchema = new mongoose.Schema({
    name: String,
    concert: [String],
    image_URL: String,
    description: String,
    nationality: String,
    genre: String,
    created_at: { type: Date, default: Date.now }
})