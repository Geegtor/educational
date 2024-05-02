import { Map, Placemark } from '@pbe/react-yandex-maps';
import { MapViewProps } from '../../models/interfaces';
import './mapView.css'
import { calculateCoordinates, getGeneralInfomation } from '../../helpers/utils';

const MapView: React.FC<MapViewProps> = ({list}) => {
    const center = calculateCoordinates(list);

    return (
        <div>
           <Map 
             width = '100%'
             height = '540px'
             defaultState={{ 
                 center: center, 
                 zoom: 9 
             }}
         >             
             {
                 list.map(e => (
                     <Placemark

                         onClick={() => {
                             alert(getGeneralInfomation(e));
                         }}
                         key={e.id}
                         geometry={[e.latitude, e.longitude]}
                         properties={{ 
                             // Details not shown TODO
                             hintContent: getGeneralInfomation(e),
                             balloonContent: getGeneralInfomation(e),
                         }}
                     />
                 ))
             }
         </Map>
        </div>
    )
};

export default MapView;
