"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const creator_service_1 = require("./creator.service");
const creatorService = new creator_service_1.CreatorService();
exports.resolvers = {
    Query: {
        creator: async (_, args) => {
            return await creatorService.getCreator(args.id);
        },
        creators: async () => {
            return await creatorService.getCreators();
        },
    },
    Mutation: {
        createCreator: async (_, args) => {
            return await creatorService.createCreator(args.input);
        },
    }
};
