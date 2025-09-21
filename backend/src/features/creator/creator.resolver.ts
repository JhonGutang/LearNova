
import { AuthenticateCreatorInput, AuthResult } from "../../generated/graphql";
import { CreatorService } from "./creator.service";
import { MyContext } from "../../types/context";
import { Status } from "../../generated/graphql";
const creatorService = new CreatorService();

export const resolvers = {
    Query: {
        creator: async (_: any, args: { id: number }) => {
            return await creatorService.getCreator(args.id);
        },
        creators: async () => {
            return await creatorService.getCreators();
        },
        sessionAccount: async (_: any, __: any, context: MyContext) => {
            console.log("SESSION CONTENT:", context.session);
        
            if (!context.session.creatorId) return null;
        
            return creatorService.getCreator(context.session.creatorId);
          },
    },
    Mutation: {
        createCreator: async (_: any, args: { input: any }) => {
            return await creatorService.createCreator(args.input);
        },
        authenticateCreator: async (
            _: any,
            args: { input: AuthenticateCreatorInput },
            context: MyContext
        ): Promise<AuthResult> => {
            const creatorId = await creatorService.validateCredentials(args.input);
            if (creatorId === null) {
                return { status: Status.Error, message: "Invalid credentials" };
            }
            context.session.creatorId = creatorId;
            return { status: Status.Success, message: "Valid Credentials" };
        }
    }
}