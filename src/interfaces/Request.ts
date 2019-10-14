import * as restana from 'restana';

// export type Request = restana.Request<restana.Protocol.HTTP>;
export interface Request extends restana.Request<restana.Protocol.HTTP> {
  body: any;
  query: any;
}

export type HttpsRequest = restana.Request<restana.Protocol.HTTPS>;
export type Http2Request = restana.Request<restana.Protocol.HTTP2>;
