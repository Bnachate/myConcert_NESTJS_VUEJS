import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { HallService } from './hall.service';
import { CreateHallDTO } from './dto/create-hall.dto';

@Controller('hall')
export class HallController {
    constructor(private hallService: HallService) { }

    // add a hall
    @Post('/create')
    async addhall(@Res() res, @Body() createhallDTO: CreateHallDTO) {
        const hall = await this.hallService.addhall(createhallDTO);
        return res.status(HttpStatus.OK).json({
            message: "hall has been created successfully",
            hall
        })
    }

    // Retrieve halls list
    @Get('halls')
    async getAllhall(@Res() res) {
        const halls = await this.hallService.getAllhall();
        return res.status(HttpStatus.OK).json(halls);
    }

    // Fetch a particular hall using ID
    @Get(':hallID')
    async gethall(@Res() res, @Param('hallID') hallID) {
        const hall = await this.hallService.gethall(hallID);
        if (!hall) throw new NotFoundException('hall does not exist!');
        return res.status(HttpStatus.OK).json(hall);
    }
    @Put('/update')
    async updatehall(@Res() res, @Query('hallID') hallID, @Body() createhallDTO: CreateHallDTO) {
        const hall = await this.hallService.updatehall(hallID, createhallDTO);
        if (!hall) throw new NotFoundException('hall does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'hall has been successfully updated',
            hall
        });
    }

    // Delete a hall
    @Delete('/delete')
    async deletehall(@Res() res, @Query('hallID') hallID) {
        const hall = await this.hallService.deletehall(hallID);
        if (!hall) throw new NotFoundException('hall does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'hall has been deleted',
            hall
        })
    }
}
