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
                height = '100%'
                defaultState={{ 
                    center: center, 
                    zoom: 5 
                }}
            >
                {
                    list.map(e => (
                        <Placemark
                            key={e.id}
                            geometry={[e.longitude, e.latitude]}
                            properties={{
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
