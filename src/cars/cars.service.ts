import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { Car } from './interfaces/car.interfaces';
import { v4 as uuid } from "uuid";
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Ford',
            model: 'Focus'
        },
    ];


    findAll() {
        return this.cars;
    }

    findOneById( id: string) {
        const car = this.cars.find( car => car.id === id);

        if(!car){
            throw new NotFoundException(`Car with id ${id} not found`);
        }
        return car;
    }


    create( createCarDto: CreateCarDto) {

        const car: Car = {
            id: uuid(),
            ...createCarDto,
        }

        this.cars.push( car );

        return car;
    }


    update( id: string, updateCarDto: UpdateCarDto ){

        let carDB = this.findOneById(id);

        if( updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException();

        this.cars = this.cars.map( car => {

            if( car.id === id){
                carDB = {...carDB, ...UpdateCarDto, id}
                
                return car;
            }
        });
        return carDB;
    }


    delete( id: string ) {
        
        const car = this.findOneById(id);
        
        this.cars = this.cars.filter( car => car.id !== id );
    }
}
