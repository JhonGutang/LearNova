#!/usr/bin/env node

import http, { Server } from 'http';
import app from '../app';
import debug from 'debug';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { json } from 'body-parser';
import { readFileSync } from 'fs';
import { join } from 'path';

// Import both course and lesson resolvers
import { resolvers as courseResolvers } from '../features/courses/course.resolver';
import { resolvers as lessonResolvers } from '../features/lessons/lesson.resolver';
import { resolvers as lessonPageResolvers } from '../features/lesson_page/lesson_page.resolver';

dotenv.config();

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const httpServer: Server = http.createServer(app);

// Read GraphQL schemas from files
const courseTypeDefs = readFileSync(join(__dirname, '../features/courses/course.graphql'), 'utf8');
const lessonTypeDefs = readFileSync(join(__dirname, '../features/lessons/lesson.graphql'), 'utf8');
const lessonPageTypeDefs = readFileSync(join(__dirname, '../features/lesson_page/lesson_page.graphql'), 'utf8');

// Merge typeDefs and resolvers
const typeDefs = [courseTypeDefs, lessonTypeDefs, lessonPageTypeDefs] ;
const resolvers = [courseResolvers, lessonResolvers, lessonPageResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }), // Apollo Sandbox
  ],
});

async function startApollo() {
  await server.start();

  app.use('/graphql', json(), expressMiddleware(server));

  httpServer.listen(port);
  httpServer.on('error', onError);
  httpServer.on('listening', onListening);
}

startApollo();

function normalizePort(val: string): number | string | false {
  const portNumber = parseInt(val, 10);
  if (isNaN(portNumber)) return val;
  if (portNumber >= 0) return portNumber;
  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug('app:server')('Listening on ' + bind);
}
