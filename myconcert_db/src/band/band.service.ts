import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Band } from './interfaces/band.interface';
import { CreateBandDTO } from './dto/create-band.dto';

@Injectable()
export class BandService {
    constructor(@InjectModel('Band') private readonly bandModel: Model<Band>) { }
    // fetch all customers
    async getAllBand(): Promise<Band[]> {
        const bands = await this.bandModel.find().exec();
        return bands;
    }
    // Get a single customer
    async getBand(bandID): Promise<Band> {
        const band = await this.bandModel.findById(bandID).exec();
        return band;
    }
    // post a single customer
    async addBand(createBandDTO: CreateBandDTO): Promise<Band> {
        const newBand = await new this.bandModel(createBandDTO);
        return newBand.save();
    }
    // Edit customer details
    async updateBand(bandID, createBandDTO: CreateBandDTO): Promise<Band> {
        const updatedBand = await this.bandModel
            .findByIdAndUpdate(bandID, createBandDTO, { new: true });
        return updatedBand;
    }
    // Delete a customer
    async deleteBand(bandID): Promise<any> {
        const deletedBand = await this.bandModel.findByIdAndRemove(bandID);
        return deletedBand;
    }
}