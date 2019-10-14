import { RequestHandler, Protocol } from 'restana';
import { IPathData } from './IPathData';

export interface IRouteMetadaData {
  route: IPathData;
  middleWare: RequestHandler<Protocol.HTTP>[];
}
