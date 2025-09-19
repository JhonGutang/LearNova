
import { AuthenticateCreatorInput, AuthResult } from "../../generated/graphql";
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
        },
        authenticateCreator: async (
            _: any,
            args: { input: AuthenticateCreatorInput }
        ): Promise<AuthResult> => {
            const creator = await creatorService.validateCredentials(args.input);
            if (creator === null) {
                return { __typename: "AuthError", message: "invalid credentials" };
            }
            return { __typename: "Creator", ...creator };
        }
    }
}