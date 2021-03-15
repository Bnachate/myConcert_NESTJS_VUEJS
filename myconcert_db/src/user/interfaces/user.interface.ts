import { Document } from 'mongoose';

export interface User extends Document {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly password: string;
    readonly password_confirm: string;
    readonly admin: string;
    readonly isLogin?: boolean;
    readonly phone: string;
    readonly address: string;
    readonly zip_code: string;
    readonly city: string;
    readonly favorite_bands: string[];
    readonly reservation: string[];
    readonly wish: string[];
    readonly created_at: Date;
}