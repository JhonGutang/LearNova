#!/usr/bin/env node

import http, { Server } from 'http';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });


import app from '../app';
import debug from 'debug';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { json } from 'body-parser';
import { readFileSync } from 'fs';
import { join } from 'path';

// Import both course and lesson resolvers
import { resolvers as courseResolvers } from '../graphql/features/courses/course.resolver';
import { resolvers as lessonResolvers } from '../graphql/features/lessons/lesson.resolver';
import { resolvers as lessonPageResolvers } from '../graphql/features/lesson_page/lesson_page.resolver';
import { resolvers as creatorResolvers } from '../graphql/features/creator/creator.resolver';
import { resolvers as studentResolvers} from '../graphql/features/student/student.resolver';
import { resolvers as AuthResolvers } from '../graphql/features/auth/auth.resolver';
import { resolvers as PostResolver } from '../graphql/features/posts/post.resolver';
import { resolvers as CommentResolver } from '../graphql/features/comments/comment.resolver';
import { resolvers as DashboardPageResolver } from '../graphql/pages/dashboard/dashboard.resolver';
import { resolvers as CoursesPageResolver } from '../graphql/pages/courses/courses.resolver';
import { resolvers as ProgressResolver} from '../graphql/features/progress/progress.resolver'

// Load default .env file first

// Then check if we need to override with staging
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'STAGING') {
  dotenv.config({ path: '.env.staging', override: true });
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const httpServer: Server = http.createServer(app);

// Read GraphQL schemas from files
const rootTypeDefs = readFileSync(join(__dirname, '../graphql/root.graphql'), 'utf8');
const dashboardPageTypeDefs = readFileSync(join(__dirname, '../graphql/pages/dashboard/dashboard.schema.graphql'), 'utf8');
const coursesPageTypeDefs = readFileSync(join(__dirname, '../graphql/pages/courses/courses.schema.graphql'), 'utf8');
const courseTypeDefs = readFileSync(join(__dirname, '../graphql/features/courses/course.graphql'), 'utf8');
const lessonTypeDefs = readFileSync(join(__dirname, '../graphql/features/lessons/lesson.graphql'), 'utf8');
const lessonPageTypeDefs = readFileSync(join(__dirname, '../graphql/features/lesson_page/lesson_page.graphql'), 'utf8');
const creatorTypeDefs = readFileSync(join(__dirname, '../graphql/features/creator/creator.graphql'), 'utf8');
const studentTypeDefs = readFileSync(join(__dirname, '../graphql/features/student/student.graphql'), 'utf8');
const authTypeDefs = readFileSync(join(__dirname, '../graphql/features/auth/auth.graphql'), 'utf8');
const postTypeDefs = readFileSync(join(__dirname, '../graphql/features/posts/post.graphql'), 'utf8');
const commentTypeDefs = readFileSync(join(__dirname, '../graphql/features/comments/comment.graphql'), 'utf8');
const progressTypeDefs = readFileSync(join(__dirname, '../graphql/features/progress/progress.schema.graphql'), 'utf8');

const typeDefs = [rootTypeDefs, courseTypeDefs, lessonTypeDefs, lessonPageTypeDefs, creatorTypeDefs, studentTypeDefs, authTypeDefs, postTypeDefs, commentTypeDefs, dashboardPageTypeDefs, coursesPageTypeDefs, progressTypeDefs] ;
const resolvers = [courseResolvers, lessonResolvers, lessonPageResolvers, creatorResolvers, studentResolvers, AuthResolvers, PostResolver, CommentResolver, DashboardPageResolver, CoursesPageResolver, ProgressResolver];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }), // Apollo Sandbox
  ],
});

async function startApollo() {
  await server.start();

  app.use(
    '/graphql',
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        session: (req as any).session,
        req,
        res,
      }),
    })
  );

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
