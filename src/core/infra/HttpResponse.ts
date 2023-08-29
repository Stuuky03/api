export type HttpResponse = {
  statusCode: number
  body: any
}

export function created(): HttpResponse {
  return {
    statusCode: 201,
    body: undefined,
  }
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  }
}