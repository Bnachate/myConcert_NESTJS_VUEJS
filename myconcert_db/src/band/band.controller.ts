import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { BandService } from './band.service';
import { CreateBandDTO } from './dto/create-band.dto';

@Controller('band')
export class BandController {
    constructor(private bandService: BandService) { }

    // add band
    @Post('/create')
    async addBand(@Res() res, @Body() createBandDTO: CreateBandDTO) {
        const band = await this.bandService.addBand(createBandDTO);
        return res.status(HttpStatus.OK).json({
            message: "Band has been created successfully",
            band
        })
    }

    // Retrieve bands list
    @Get('bands')
    async getAllBand(@Res() res) {
        const bands = await this.bandService.getAllBand();
        return res.status(HttpStatus.OK).json(bands);
    }

    // Fetch a particular band using ID
    @Get('band/:bandID')
    async getBand(@Res() res, @Param('bandID') bandID) {
        const band = await this.bandService.getBand(bandID);
        if (!band) throw new NotFoundException('Band does not exist!');
        return res.status(HttpStatus.OK).json(band);
    }
    @Put('/update')
    async updateBand(@Res() res, @Query('bandID') bandID, @Body() createBandDTO: CreateBandDTO) {
        const band = await this.bandService.updateBand(bandID, createBandDTO);
        if (!band) throw new NotFoundException('Band does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Band has been successfully updated',
            band
        });
    }

    // Delete a band
    @Delete('/delete')
    async deleteBand(@Res() res, @Query('bandID') bandID) {
        const band = await this.bandService.deleteBand(bandID);
        if (!band) throw new NotFoundException('Band does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Band has been deleted',
            band
        })
    }
}