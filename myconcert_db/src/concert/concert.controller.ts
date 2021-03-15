import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDTO } from './dto/create-concert.dto';

@Controller('/concert')
export class ConcertController {

    constructor(private concertService: ConcertService) { };

    @Post('/create')
    async addConcert(@Res() res, @Body() CreateConcertDTO: CreateConcertDTO) {
        const concert = await this.concertService.addConcert(CreateConcertDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Concert has been created successfully',
            concert
        })
    }

    @Get('/concerts')
    async getAllConcert(@Res() res) {
        const concert = await this.concertService.getAllConcert();
        return res.status(HttpStatus.OK).json(concert);
    }

    @Get('/:concertID')
    async getConcert(@Res() res, @Param('concertID') concertID) {
        const concert = await this.concertService.getConcert(concertID);
        if (!concertID) throw new NotFoundException("Concert doesn't exist");
        return res.status(HttpStatus.OK).json(concert);
    }

    @Put('/update')
    async updateConcert(@Res() res, @Query('concertID') concertID, @Body() createConcertDTO: CreateConcertDTO) {
        const concert = await this.concertService.updateConcert(concertID, createConcertDTO);
        if (!concert) throw new NotFoundException('concert does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Concert has been successfully updated',
            concert
        });
    }

    @Delete('/delete')
    async deleteConcert(@Res() res, @Query('concertID') concertID) {
        const concert = await this.concertService.deleteConcert(concertID);
        if (!concert) throw new NotFoundException('concert does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Concert has been deleted',
            concert
        })
    }

}
