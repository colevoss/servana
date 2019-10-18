import { Server, Service, Context, Get, Request, Response } from '../src';

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
