import * as mongoose from 'mongoose';

export const HallSchema = new mongoose.Schema({
    name: String,
    nb_places: String,
    location: String,
    description: String,
    created_at: { type: Date, default: Date.now }
})