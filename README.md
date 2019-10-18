# Servana

A lightweight TypesScript REST API framework built on top of [Restana](https://github.com/jkyberneees/ana#readme)

## What is this?

This library helps you write REST API's with TypeScript more easily and more enjoyably. Servana leverages concepts like class inheritance for `Service`'s and Decorators for actions. After working with custom TS wrappers for the Moleculer framework, I was motivated to port over some of the concepts I learned over to a REST API.

## Why Restana?

According to Restana's docs and @jkyberneees's research and benchmarking, Restana is one of the fastest HTTP server's written in Node.js ([See here]())

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
