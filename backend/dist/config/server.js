#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("@apollo/server");
const express4_1 = require("@as-integrations/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const body_parser_1 = require("body-parser");
const fs_1 = require("fs");
const path_1 = require("path");
// Import both course and lesson resolvers
const course_resolver_1 = require("../features/courses/course.resolver");
const lesson_resolver_1 = require("../features/lessons/lesson.resolver");
const lesson_page_resolver_1 = require("../features/lesson_page/lesson_page.resolver");
const creator_resolver_1 = require("../features/creator/creator.resolver");
const student_resolver_1 = require("../features/student/student.resolver");
const auth_resolver_1 = require("../features/auth/auth.resolver");
const post_resolver_1 = require("../features/posts/post.resolver");
const comment_resolver_1 = require("../features/comments/comment.resolver");
const envFile = process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env';
dotenv_1.default.config({ path: envFile });
const port = normalizePort(process.env.PORT || '3000');
app_1.default.set('port', port);
const httpServer = http_1.default.createServer(app_1.default);
// Read GraphQL schemas from files
const rootTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/root.graphql'), 'utf8');
const courseTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/courses/course.graphql'), 'utf8');
const lessonTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/lessons/lesson.graphql'), 'utf8');
const lessonPageTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/lesson_page/lesson_page.graphql'), 'utf8');
const creatorTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/creator/creator.graphql'), 'utf8');
const studentTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/student/student.graphql'), 'utf8');
const authTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/auth/auth.graphql'), 'utf8');
const postTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/posts/post.graphql'), 'utf8');
const commentTypeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../features/comments/comment.graphql'), 'utf8');
// Merge typeDefs and resolvers
const typeDefs = [rootTypeDefs, courseTypeDefs, lessonTypeDefs, lessonPageTypeDefs, creatorTypeDefs, studentTypeDefs, authTypeDefs, postTypeDefs, commentTypeDefs];
const resolvers = [course_resolver_1.resolvers, lesson_resolver_1.resolvers, lesson_page_resolver_1.resolvers, creator_resolver_1.resolvers, student_resolver_1.resolvers, auth_resolver_1.resolvers, post_resolver_1.resolvers, comment_resolver_1.resolvers];
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }), // Apollo Sandbox
    ],
});
async function startApollo() {
    await server.start();
    app_1.default.use('/graphql', (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => ({
            session: req.session,
            req,
            res,
        }),
    }));
    httpServer.listen(port);
    httpServer.on('error', onError);
    httpServer.on('listening', onListening);
}
startApollo();
function normalizePort(val) {
    const portNumber = parseInt(val, 10);
    if (isNaN(portNumber))
        return val;
    if (portNumber >= 0)
        return portNumber;
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
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
function onListening() {
    const addr = httpServer.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    (0, debug_1.default)('app:server')('Listening on ' + bind);
}
