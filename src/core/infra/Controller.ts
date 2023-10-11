import { GraphqlResponse } from "./GraphqlResponse";
import { HttpResponse } from "./HttpResponse";

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse | GraphqlResponse>
}