import { FastifyRequest } from 'fastify';
import { HttpResponse } from "./HttpResponse";

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}