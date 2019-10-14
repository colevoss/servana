export default {
  swagger: '2.0',
  info: {
    description: 'Example Swagger spec.',
    version: '1.0.0',
    title: 'Swagger Hello',
  },
  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
    apiKey: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  security: [
    {
      apiKey: [],
    },
  ],
  paths: {
    '/test/{id}': {
      get: {
        security: [{ apiKey: [] }],
        tags: ['hello'],
        'x-swagger-router-controller': 'Helloer',
        operationId: 'sayHi',
        summary: 'Say hi',
        description: 'Helloer endpoint',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The name to say hi',
            type: 'integer',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              // type: 'string',
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
      },
    },
  },
};
