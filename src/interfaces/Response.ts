import * as restana from 'restana';

export type Response = restana.Response<restana.Protocol.HTTP>;
export type HttpsResponse = restana.Response<restana.Protocol.HTTPS>;
export type Http2Response = restana.Response<restana.Protocol.HTTP2>;
