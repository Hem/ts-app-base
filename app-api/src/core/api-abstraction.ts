// First we define a standard generic structure for an api response
import { RequestHandler, Request, Response } from "express";


export interface ApiMethodResponse<T> {
  statusCode?: number,
  data: T
}


// The `apiMethod` constructor will take an `ApiMethodDefinition` as argument.
export type ApiMethodDefinition<T> = (req: Request) => Promise<ApiMethodResponse<T>>


// Now the constructor:
export function apiMethod<T> (f: ApiMethodDefinition<T>): RequestHandler {

  // here we take benefit from Request & Response typings
  return async function (req: Request, res: Response) {
    // No way you forget the try/catch
    try {
      // call the apiMethod definition
      const {statusCode, data} = await f(req);
      if (data) {
        //res.setHeader('Content-Type', 'application/json');
        res.status(statusCode || 200).json(data); // .json(data);

      }else {
        // default the status to 200 and send empty response
        res.sendStatus(statusCode || 200);
      }
    } catch (e) {
      // always catch any unexpected error
      res.status(500).send(e)
    }
  }
}