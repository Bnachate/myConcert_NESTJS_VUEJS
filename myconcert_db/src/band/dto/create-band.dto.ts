export class CreateBandDTO {
    readonly name: string;
    readonly concert: string[];
    readonly image_URL: string;
    readonly description: string;
    readonly nationality: string;
    readonly genre: string;
    readonly created_at: Date;
}