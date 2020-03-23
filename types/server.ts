import type {
  ServerResponse as ServerResponseBase,
  ServerRequest as ServerRequestBase,
} from "microrouter";

export interface ServerRequest extends ServerRequestBase {
  cookies: { [key: string]: string };
  body: any;
}

export type ServerResponse = ServerResponseBase;
