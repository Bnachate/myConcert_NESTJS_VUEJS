import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Concert } from './interfaces/concert.interface';
import { CreateConcertDTO } from './dto/create-concert.dto';

@Injectable()
export class ConcertService {
    constructor(@InjectModel('Concert') private readonly concertModel: Model<Concert>) { }

    async getAllConcert(): Promise<Concert[]> {
        const concert = await this.concertModel.find().exec();
        return concert;
    }

    async getConcert(concertID): Promise<Concert> {
        const concert = await this.concertModel.findById(concertID).exec();
        return concert;
    }

    async addConcert(CreateConcertDTO: CreateConcertDTO): Promise<Concert> {
        const newConcert = await new this.concertModel(CreateConcertDTO);
        return newConcert.save();
    }

    async updateConcert(concertID, createConcertDTO: CreateConcertDTO): Promise<Concert> {
        const updateConcert = await this.concertModel.findByIdAndUpdate(concertID, createConcertDTO, { new: true });
        return updateConcert;
    }

    async deleteConcert(concertID): Promise<any> {
        const deletedConcert = await this.concertModel.findByIdAndRemove(concertID);
        return deletedConcert;
    }
}
