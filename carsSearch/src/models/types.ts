export type TAPIError = {
    reason: string
}
  
  export type TResult<TResponse> = {
    status: number
    data: TResponse
}