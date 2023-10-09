import { FastifyRequest, FastifyReply } from "fastify";
import { Controller } from "../Controller";

export const adaptResolver = async (controller: Controller): Promise<any> => {
  return async (request: FastifyRequest, response: FastifyReply) => {
    const requestData = {
      body: request.body,
      query: request.query,
      params: request.params,
      headers: request.headers,
    }

    const httpResponse = await controller.handle(requestData.body);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.code(httpResponse.statusCode).send(httpResponse.data);
    } else {
      return response.code(httpResponse.statusCode).send({
        error: httpResponse.data.error
      })
    }
  }
}