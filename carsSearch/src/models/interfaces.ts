export interface Car {
    id: number;
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    latitude: number;
    longitude: number;
}

export interface CarCardProps {
    key: number,
    car: Car;
    onEditCar: (editedCar: Car) => void;
    onDeleteCar: (id: number) => void;
}

export interface SortingPanelProps {
    cars: Car[],
    onSort: (cars: Car[]) => void
}

export interface MapViewProps {
    list: Car[]
}
