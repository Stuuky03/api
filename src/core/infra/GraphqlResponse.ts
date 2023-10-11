export type GraphqlResponse<T = any> = {
  data: T
}

export function modelData(model: any): GraphqlResponse {
  return {
    data: model,
  }
}