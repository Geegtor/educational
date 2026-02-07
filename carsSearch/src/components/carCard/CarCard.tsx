import { useState } from 'react';
import { Car, CarCardProps } from '../../models/interfaces';
import './carCard.css'



const CarCard: React.FC<CarCardProps> = ({
    car,
    onEditCar,
    onDeleteCar 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCar, setEditedCar] = useState<Car>({ ...car });
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = () => {
      onEditCar(editedCar);
      setIsEditing(false);
    };
  
    const handleCancel = () => {
      setEditedCar({ ...car });
      setIsEditing(false);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedCar((prevCar) => ({
        ...prevCar,
        [name]: value,
      }));
    };
  
    return (
      <>
        {isEditing ? (
          <div className = 'card_container'>
            <input type='text' name='name' value={editedCar.name} onChange={handleChange} />
            <input type='text' name='model' value={editedCar.model} onChange={handleChange} />
            <div>{car.year}</div>
            <div>{car.color}</div>
            <input type='number' name='price' value={editedCar.price} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className = 'card_container'>
            <div>{car.name}</div>
            <div>{car.model}</div>
            <div>{car.year}</div>
            <div>{car.color}</div>
            <div>{car.price}</div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDeleteCar(car.id)}>Delete</button>
          </div>
        )}
      </>
    );
  };
  
  export default CarCard;
  
  