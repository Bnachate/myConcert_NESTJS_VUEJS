import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hall } from './interfaces/hall.interface';
import { CreateHallDTO } from './dto/create-hall.dto';

@Injectable()
export class HallService {
    constructor(@InjectModel('hall') private readonly hallModel: Model<Hall>) { }
    // fetch all halls
    async getAllhall(): Promise<Hall[]> {
        const halls = await this.hallModel.find().exec();
        return halls;
    }
    // Get a single hall
    async gethall(hallID): Promise<Hall> {
        const hall = await this.hallModel.findById(hallID).exec();
        return hall;
    }
    // post a single hall
    async addhall(createhallDTO: CreateHallDTO): Promise<Hall> {
        const newhall = await new this.hallModel(createhallDTO);
        return newhall.save();
    }
    // Edit hall details
    async updatehall(hallID, createhallDTO: CreateHallDTO): Promise<Hall> {
        const updatedhall = await this.hallModel
            .findByIdAndUpdate(hallID, createhallDTO, { new: true });
        return updatedhall;
    }
    // Delete a hall
    async deletehall(hallID): Promise<any> {
        const deletedhall = await this.hallModel.findByIdAndRemove(hallID);
        return deletedhall;
    }
}
