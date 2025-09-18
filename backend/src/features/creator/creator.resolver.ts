
import { CreatorService } from "./creator.service";

const creatorService = new CreatorService();

export const resolvers = {
    Query: {
        creator: async (_: any, args: { id: number }) => {
            return await creatorService.getCreator(args.id);
        },
        creators: async () => {
            return await creatorService.getCreators();
        }
    },
    Mutation: {
        createCreator: async (_: any, args: { input: any }) => {
            return await creatorService.createCreator(args.input);
        }
    }
}