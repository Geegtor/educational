import React, { useState } from 'react';
import { SortingPanelProps } from '../../models/interfaces';

const SortingPanel: React.FC<SortingPanelProps> = ({
     cars,
     onSort 
    }) => {
    
    const [toogle, setToogle] = useState(-1);

    const handleSortByYear = () => {
    setToogle(prev => prev > 0 ? -1 : 1)
    const sortedCars = [...cars].sort((a, b) => toogle * (a.year - b.year));
        onSort(sortedCars);
    };

    const handleSortByPrice = () => {
    setToogle(prev => prev > 0 ? -1 : 1)
    const sortedCars = [...cars].sort((a, b) => toogle * (a.price - b.price));
        onSort(sortedCars);
    };

    return (
    <div>
        <button onClick={handleSortByYear}>Sort by Year</button>
        <button onClick={handleSortByPrice}>Sort by Price</button>
    </div>
    );
};

export default SortingPanel;
