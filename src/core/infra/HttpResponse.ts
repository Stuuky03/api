export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export function created(): HttpResponse {
  return {
    statusCode: 201,
    data: undefined,
  }
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    data: {
      error: error.message,
    },
  }
}