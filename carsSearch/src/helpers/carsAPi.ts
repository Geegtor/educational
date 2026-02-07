import { Car } from '../models/interfaces'
import { TAPIError, TResult } from '../models/types'
import { baseURL } from './const'
import { http } from './http'

export default class CarsApi {
    constructor(){
    }

    async getCars(): Promise<TResult<Car[] | TAPIError>> {	
        return http.get<Car[]>(`${baseURL}/vehicles`)
    }
}
