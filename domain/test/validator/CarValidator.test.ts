import {CarValidator} from "../../src/validator/CarValidator";
import {Car} from "../../src/entity/Car";

import { should } from 'chai';
import {Manufacturer} from "../../src/entity/Manufacturer";
should();

describe('Car validator', function () {
    const validator = new CarValidator();

    const manufacturer = new Manufacturer();
    manufacturer.phone = "+380973210167";
    manufacturer.name = "Gary Moore";
    manufacturer.siret = 112345678912;

    it('should return TRUE for car with positive price', function () {
        const car = new Car();
        car.firstRegistrationDate = new Date();
        car.price = 500;
        car.manufacturer = manufacturer;

        const result = validator.Validate(car);

        result.should.be.true;
    });

    it('should return FALSE for car with negative price', function () {
        const car = new Car();
        car.firstRegistrationDate = new Date();
        car.price = -500.25;
        car.manufacturer = manufacturer;

        const result = validator.Validate(car);

        result.should.be.false;
    });

    it('should return FALSE for car without registration date', function () {
        const car = new Car();
        car.price = 369_000;
        car.manufacturer = manufacturer;

        const result = validator.Validate(car);

        result.should.be.false;
    });

    it('should return FALSE for car without manufacturer data', function () {
        const car = new Car();
        car.firstRegistrationDate = new Date();
        car.price = -500.25;

        const result = validator.Validate(car);

        result.should.be.false;
    });
});
