import { Server, Get, Post, Put, Delete, Service, Context } from '../src';
import axios from 'axios';

class TestServer extends Server {}

class TestService extends Service {
  public route = 'test';

  @Get()
  public nothing(ctx: Context) {
    ctx.send({ nothing: 'success' });
  }

  @Get('/get')
  public get(ctx: Context) {
    ctx.send({ get: 'success' });
  }

  @Post('/post')
  public post(ctx: Context) {
    ctx.send({ post: 'success' });
  }

  @Put('/put')
  public put(ctx: Context) {
    ctx.send({ put: 'success' });
  }

  @Delete('/delete')
  public delete(ctx: Context) {
    ctx.send({ delete: 'success' });
  }
}

describe('@Get', () => {
  it('Creates a GET route', async () => {
    const server = await TestServer.create([TestService]);

    await server.start(1111);

    const { data } = await axios.get('http://localhost:1111/test/get');

    expect(data).toHaveProperty('get', 'success');

    await server.stop();
  });
});

describe('@Post', () => {
  it('Creates a POST route', async () => {
    const server = await TestServer.create([TestService]);

    await server.start(1111);

    const { data } = await axios.post('http://localhost:1111/test/post');

    expect(data).toHaveProperty('post', 'success');

    await server.stop();
  });
});

describe('@Put', () => {
  it('Creates a PUT route', async () => {
    const server = await TestServer.create([TestService]);

    await server.start(1111);

    const { data } = await axios.put('http://localhost:1111/test/put');

    expect(data).toHaveProperty('put', 'success');

    await server.stop();
  });
});

describe('@Delete', () => {
  it('Creates a DELETE route', async () => {
    const server = await TestServer.create([TestService]);

    await server.start(1111);

    const { data } = await axios.delete('http://localhost:1111/test/delete');

    expect(data).toHaveProperty('delete', 'success');

    await server.stop();
  });
});

describe('createAction default string', () => {
  it('Defaults route to /', async () => {
    const server = await TestServer.create([TestService]);

    await server.start(1111);

    const { data } = await axios.get('http://localhost:1111/test');

    expect(data).toHaveProperty('nothing', 'success');

    await server.stop();
  });
});
