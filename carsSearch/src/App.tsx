import CarsList from './components/carsList/CarsList'
import './App.css'
import { YMaps } from '@pbe/react-yandex-maps'
import { API_KEY } from './helpers/const'
function App() {

  return (
    <>
      <YMaps
        query={{
          apikey: API_KEY
      }}>
        <CarsList />
      </YMaps>
    </>
  )
}

export default App
