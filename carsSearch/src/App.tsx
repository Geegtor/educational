import CarsList from './components/carsList/CarsList'
import './App.css'
import { YMaps } from '@pbe/react-yandex-maps'
function App() {

  return (
    <>
      <YMaps>
        <CarsList />
      </YMaps>
    </>
  )
}

export default App
