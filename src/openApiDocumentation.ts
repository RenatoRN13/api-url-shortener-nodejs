module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Challenge - Wiser Educação',
    description: 'Api to corvert long URLs in short URLs.',
    contact: {
      name: 'Renato Filho',
      email: 'renatorncc@gmail.com',
      url: 'https://www.linkedin.com/in/renato-filho/'
    }
  },
  servers: [
    {
      url: 'http://localhost:8081/',
      description: 'Local server'
    },
  ],
  paths: {
    '/{key}': {
      get: {
        description: 'Redirect users to full URL registred to a short URL.',
        parameters: [
          {
            name: 'key',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/keyURL'
            },
            required: true,
            description: 'Short url to access the site registred.'
          }
        ],
        responses: {
          '200': {
            description: 'Redirect the users to site requested.',
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
              }
            }
          }
        }
      },
    },
    '/encurtador': {
      post: {
        description: 'Create short URLs',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/URLs'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'localhost:8081/x6gjj6miok'
          },
          '400': {
            description: 'URL already registred!',
          }
        }
      }
    }
  },
  components: {
    schemas: {
      keyURL: {
        type: 'string',
        description: 'Key to access full url',
        example: 'localhost:8081/fbpno1313l'
      },
      URLs: {
        type: 'object',
        description: 'Complete url to generate a short url.',
        example: { url: "http://wisereducacao.com" },
      },
      Error: {
        type: 'string',
        example: 'Not Found'
      }
    }
  }
};