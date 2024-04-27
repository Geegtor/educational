import { Car } from '../models/interfaces';

export const calculateCoordinates = (cars: Car[]): [number, number] => {
    const totalLatitude = cars.reduce((acc, car) => acc + car.latitude, 0);
    const totalLongitude = cars.reduce((acc, car) => acc + car.longitude, 0);
    const averageLatitude = totalLatitude / cars.length;
    const averageLongitude = totalLongitude / cars.length;
  
    return [
        parseFloat(averageLatitude.toFixed(6)),
        parseFloat(averageLongitude.toFixed(6))
    ];
};

export const getGeneralInfomation =(car: Car): string => {
    return `${car.name}, ${car.model}, ${car.year}, ${car.price}$`
}
