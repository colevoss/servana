import 'reflect-metadata';
import { Method } from './interfaces/Method';

function createAction(method: Method, route: string = '/') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const keyMetadata = Reflect.getMetadata(key, target) || {};

    const newMetadata = {
      ...keyMetadata,
      route: { method, route },
    };

    Reflect.defineMetadata(key, newMetadata, target);

    return descriptor;
  };
}

export function Get(route?: string) {
  return createAction(Method.Get, route);
}

export function Post(route?: string) {
  return createAction(Method.Post, route);
}

export function Put(route?: string) {
  return createAction(Method.Put, route);
}

export function Delete(route?: string) {
  return createAction(Method.Delete, route);
}
