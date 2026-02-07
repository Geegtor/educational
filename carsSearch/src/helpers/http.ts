import { TResult } from '../models/types'

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
  
  function get<TResponse>(url: string, options: RequestInit = {}) {
    const requestOptions: RequestInit = {
      method: METHODS.GET,
      mode: 'cors'
    }
    return fetch(url, Object.assign(requestOptions, options)).then(
      handleResponse<TResponse>
    )
  }
  
  function handleResponse<TResponse>(response: Response) {
    return new Promise<TResult<TResponse>>(function (resolve, reject) {
      response.text().then(text => {
        if (!response.ok) {
          reject(text)
        }
  
        if (response.headers.get('content-type')?.includes('application/json')) {
          resolve({
            status: response.status,
            data: JSON.parse(text),
          })
        } else {
          resolve({
            status: response.status,
            data: text as TResponse,
          })
        }
      })
    })
  }
  
  export const http = {
    get
  }
  