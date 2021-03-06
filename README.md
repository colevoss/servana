# Servana

A lightweight TypesScript REST API framework built on top of [Restana](https://github.com/jkyberneees/ana#readme)

## What is this?

This library helps you write REST API's with TypeScript more easily and more enjoyably. Servana leverages concepts like class inheritance for `Service`'s and Decorators for actions. After working with custom TS wrappers for the Moleculer framework, I was motivated to port over some of the concepts I learned over to a REST API.

## Why Restana?

According to Restana's docs and @jkyberneees's research and benchmarking, Restana is one of the fastest HTTP server's written in Node.js.

As you can see [here](https://github.com/the-benchmarker/web-frameworks#full-table-1), Restana is much faster than other popular HTTP/REST node libraries like Express, Koa, and Fastify so I wanted to build my little TS framework on top of the fastest library out there.

## Install

This package is currently hosted on Github's Package Registry so you will need to do some stuff

```
TODO: DO STUFF
```

Then install package via npm or yarn

```bash
npm install @colevoss/servana --save

# OR

yarn add @colevoss/servana
```

## Examples

### Super Simple

This example sets up an HTTP server with a route of `GET /my-route/hello` that will respond with a JSON object of `{ howdy: 'hello ' }`

See [`examples/super-simple.ts`](examples/super-simple.ts)

```typescript
import { Service, Server, Get, Context } from '@colevoss/servana';

// Create a route and its actions
class MyService extends Service {
  // Base Route
  public route = 'my-route';

  @Get('/hello') // Creates the route GET /my-route/hello
  public hello(context: Context) {
    // Sends back JSON
    context.send({ howdy: 'Hello' });
  }
}

// Create the server
class MyServer extends Server {
  public name = 'MyServer';
}

// Start it up (async/await)
const main = async () => {
  // Initialize the server and service routes
  const server = await MyServer.create([MyService]);

  // Start the service and listen on route 3000
  await server.start(3000);
};

main();

// OR Start up using promises

MyServer.create([MyService]).then((server) => {
  server.start(3000);
});
```

## Spec

### Route Decorators

The `@Get`, `@Post`, `@Put`, and `@Delete` decorators are available to create your service endpoints. Supply a path to each decorator to create that endpoint.

```ts
class TestService extends Service {
  public route = 'test';

  @Get('/get-route')
  public async getRoute(ctx: Context) {
    /* ... */
  }

  @Post('/post-route')
  public async postRoute(ctx: Context) {
    /* ... */
  }

  @Put('/put-route')
  public async putRoute(ctx: Context) {
    /* ... */
  }

  @Delete('/delete-route')
  public async deleteRoute(ctx: Context) {
    /* ... */
  }
}
```

Since restana uses `find-my-way` for its routing, the Route Decorators support [these path formats](https://github.com/delvedor/find-my-way#supported-path-formats).

You can use path parameters like `/test/:id` and the `id` parameter will be available at `context.params.id` that is passed to that endpoint.

**note:** More methods will probably added later.

### [`Service`](src/Service.ts)

The `Servce` class is used to create a collection of routes off of a base route. Extend this class to create new services and endpoints.

#### route

```ts
public route: string;
```

The `route` property acts as a base route for all endpoints declared in that service.
**note**: You do not need to add a leading `/` to the route property.

#### contextFactory

```ts
public contextFactory<T>(
  request: Request,
  response: Response
): T extends Context`
```

The `contextFactory` function is called on each request and initializes an intance of Context to be passed to each endpoint by default. This function can be overwritten to supply a custom `Context` instance to each endpoint.

### [`Context<Body, Query>`](src/Context.ts)

#### Context

```ts
new Context(request: Request, response: Response)
```

#### params

```ts
public params: { [key: string]: string }
```

The route params for the endpoint's route. A route of `/:id` will provide the params at `context.params.id`

#### body

The `body` property is populated by the request body provided on post, put, and delete requests

```ts
interface TestBody {
  abra: string;
  ala: string;
}

class BodyExampleService extends Service {
  public route = 'hello';

  @Get('/test')
  public bodyExamplePath(ctx: Context<TestBody>) {
    // Access the request body at ctx.body
  }
}
```

```js
fetch('host/hello/test', {
  method: 'POST',
  body: JSON.stringify({
    abra: 'kadabra',
    ala: 'kazam',
  }),
});
```

#### query

```ts
public query: Q;
```

The query property is populated by the query parameters provided when a request to that endpoint is requested.

```ts
interface TestQuery {
  abra: string;
  ala: string;
}

class QueryExampleService extends Service {
  public route = 'hello';

  @Get('/test')
  public queryExamplePath(ctx: Context<{}, TestQuery>) {
    // Access the query params at ctx.query
  }
}
```

A request to `GET hello/test?abra=kadabra&ala=kazam` will populate the `ctx.query` object as follows:

```ts
{
  abra: 'kadabra',
  ala: 'kazam'
}
```

#### send()

```ts
public send<T>(data: T, code: number = 200)
```

Use the `send` function to respond with a JSON response. The object provided as `data` will be the response body when the endpoint is requested. You can optionally provide a different status code as the `code` to respond with a different status code. By default the status code is `200`.

#### error()

```ts
public error<E>(error: E)
```

Servana uses [restify-errors](https://github.com/restify/errors) to provide a wide range of error objects that map to many HTTP status codes. Provide an instance of any restify error to this function and the request will be responded to appropriately. Errors can be imported directly from Servana like so:

```ts
import { InternalServerError } from '@colevoss/servana';
```
