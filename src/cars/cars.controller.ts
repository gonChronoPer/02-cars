import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    
    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }


    @Get(':id')
    getCarById( @Param('id', ParseUUIDPipe) id: string ) {
        return this.carsService.findOneById(id);
    }


    @Post()
    createCard( @Body() createCarDto: CreateCarDto ) {
        return this.carsService.create(createCarDto);
    }

    @Put(':id')
    updateCard( 
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto 
    ) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCard( @Param('id', ParseUUIDPipe) id: string ) {
        return this.carsService.delete(id);
    }
}
