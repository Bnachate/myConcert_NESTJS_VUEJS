import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    password_confirm: String,
    admin: String,
    isLogin: Boolean,
    phone: String,
    address: String,
    zip_code: String,
    city: String,
    favorite_bands: [String],
    reservation: [String],
    wish: [String],
    created_at: { type: Date, default: Date.now }
})

