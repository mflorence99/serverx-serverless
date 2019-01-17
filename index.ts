import 'reflect-metadata';

import { Attr } from 'serverx-ts';
import { AWSLambdaApp } from 'serverx-ts';
import { BinaryTyper } from 'serverx-ts';
import { Compressor } from 'serverx-ts';
import { COMPRESSOR_OPTS } from 'serverx-ts';
import { CORS } from 'serverx-ts';
import { GCFApp } from 'serverx-ts';
import { Handler } from 'serverx-ts';
import { Injectable } from 'injection-js';
import { Message } from 'serverx-ts';
import { Observable } from 'rxjs';
import { OpenAPI } from 'serverx-ts';
import { REQUEST_LOGGER_OPTS } from 'serverx-ts';
import { RequestLogger } from 'serverx-ts';
import { Route } from 'serverx-ts';

import { tap } from 'rxjs/operators';

@Injectable() class Explode extends Handler {
  handle(message$: Observable<Message>): Observable<Message> {
    return message$.pipe(
      tap(({ response }) => {
        response['x']['y'] = 'z';
      })
    );
  }
}

@Injectable() class Hello extends Handler {
  handle(message$: Observable<Message>): Observable<Message> {
    return message$.pipe(
      tap(({ response }) => {
        response.body = 'Hello, http!';
      })
    );
  }
}

@Injectable() class Goodbye extends Handler {
  handle(message$: Observable<Message>): Observable<Message> {
    return message$.pipe(
      tap(({ response }) => {
        response.body = 'Goodbye, http!';
      })
    );
  }
}

class FooBodyInner {
  @Attr() a: number;
  @Attr() b: string;
  @Attr() c: boolean;
}

class FooBody {
  @Attr() p: string;
  @Attr() q: boolean;
  @Attr() r: number;
  @Attr({ _class: FooBodyInner }) t: FooBodyInner[];
}

class FooBarParams {
  @Attr() id: string;
}

const routes: Route[] = [

  {
    path: '',
    methods: ['GET'],
    middlewares: [BinaryTyper, RequestLogger, Compressor, CORS],
    services: [
      { provide: REQUEST_LOGGER_OPTS, useValue: { colorize: true } },
      { provide: COMPRESSOR_OPTS, useValue: { threshold: 0 } } 
    ],
    summary: 'A family of test endpoints',
    children: [

      {
        description: 'Develop OpenAPI representation of this server',
        path: 'openapi.yml',
        handler: OpenAPI
      },

      {
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        path: '/foo',
        children: [

          {
            path: '/bar/{id}',
            request: {
              body: {
                'application/x-www-form-urlencoded': FooBody,
                'application/json': FooBody
              },
              path: FooBarParams
            }
          },

          {
            path: '/baz'
          }
          
        ]
      },

      {
        path: '/hello',
        handler: Hello
      },

      {
        path: '/goodbye',
        handler: Goodbye
      },

      {
        path: '/isalive'
      },

      {
        description: 'This one will blow your mind!',
        methods: ['GET'],
        path: '/explode',
        handler: Explode
      },

      {
        methods: ['GET'],
        path: '/not-here',
        redirectTo: 'http://over-there.com'
      }

    ]
  }

];

const awsApp = new AWSLambdaApp(routes, { title: 'serverx-serverless', version: '1.0' });

export function aws(event, context) {
  return awsApp.handle(event, context);
}

const gcfApp = new GCFApp(routes, { title: 'serverx-serverless', version: '1.0' });

export function gcf(req, res) {
  gcfApp.handle(req, res);
}
