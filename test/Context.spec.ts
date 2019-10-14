import { Context, Request, Response } from '../src';
import { InternalServerError } from '../src/errors';

describe('.send', () => {
  it('Sends data and code through the response', () => {
    const mockResponse = {
      send: jest.fn().mockImplementation((data, code) => {
        expect(data).toStrictEqual({ success: true });
        expect(code).toBe(201);
      }),
    };

    const context = new Context(
      {} as Request,
      (mockResponse as unknown) as Response,
    );

    context.send({ success: true }, 201);
  });

  it('Sends data and through the response and defaults code to 200', () => {
    const mockResponse = {
      send: jest.fn().mockImplementation((data, code) => {
        expect(data).toStrictEqual({ success: true });
        expect(code).toBe(200);
      }),
    };

    const context = new Context(
      {} as Request,
      (mockResponse as unknown) as Response,
    );

    context.send({ success: true });
  });
});

describe('.error', () => {
  it('Sends error data and code through response', () => {
    const mockResponse = {
      send: jest.fn().mockImplementation((error, code) => {
        expect(error).toHaveProperty('message', 'Test');
        expect(code).toBe(500);
      }),
    };

    const context = new Context(
      {} as Request,
      (mockResponse as unknown) as Response,
    );

    const error = new InternalServerError('Test');

    context.error(error);
  });
});
