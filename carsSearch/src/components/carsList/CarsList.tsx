import React, { useState, useEffect, useCallback } from 'react';
import CarsApi from '../../helpers/carsAPi';
import { Car } from '../../models/interfaces';
import CarCard from '../carCard/CarCard';
import SortingPanel from '../sortingPanel/SortingPanel';
import './cardList.css'
import MapView from '../mapView/MapView';
import { Map } from '@pbe/react-yandex-maps';

const CarsList: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [isMapViewOpen, setIsMapViewOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const api = new CarsApi();
              const { data } = await api.getCars();
  
              if (Array.isArray(data)){
                  setCars(data);
                  setLoading(false);
              }
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchData();
  }, []);
 
    const handleEditCar = useCallback((editedCar: Car) => {
        const updatedCars = cars.map((car) => (car.id === editedCar.id ? { ...editedCar } : car));
        setCars(updatedCars);
      }, [cars]);
      
      const handleDeleteCar = useCallback((id: number) => {
        const updatedCars = cars.filter((car) => car.id !== id);
        setCars(updatedCars);
      }, [cars]);
      
      const openMapView = useCallback(() => {
        setIsMapViewOpen(true);
      }, []);
      
      const closeMapView = useCallback(() => {
        setIsMapViewOpen(false);
      }, []);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <SortingPanel
        cars = {cars}
        onSort={setCars}  
      />

      <div className='cards_container'>
        {cars.map((car: Car) => (
          <CarCard
            key={car.id}
            car={car}
            onEditCar={handleEditCar}
            onDeleteCar={handleDeleteCar}
          />
          
        ))}
      </div>
      <MapView 
              list = {cars} 
        />
    </>
  );
};

export default CarsList;
