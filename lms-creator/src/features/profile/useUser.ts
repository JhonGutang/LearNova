import * as ApolloReact from "@apollo/client/react";
import { GET_USER_PROFILE, EDIT_USER } from "./query";

// Define a User type based on the expected shape from GET_USER_PROFILE
export type User = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  profilePic?: string | null;
};

type UserProfileData = {
  user: User | null;
};

export type EditableCreatorProfileInput = {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

type EditUserResponse = {
  editUser: {
    status: string;
    message: string;
  };
};

const DEFAULT_PROFILE_IMAGE_URL =
  "https://ui-avatars.com/api/?name=John+Doe&background=random";

export function useUser() {
  const { data, loading, error, refetch } =
    ApolloReact.useQuery<UserProfileData>(GET_USER_PROFILE, {
      fetchPolicy: "network-only",
    });

  // Use default profile image if profilePic is not provided
  const userWithProfilePic = data?.user
    ? {
        ...data.user,
        profilePic:
          data.user.profilePic && data.user.profilePic.trim() !== ""
            ? data.user.profilePic
            : DEFAULT_PROFILE_IMAGE_URL,
      }
    : null;

  // Edit user mutation using the shape as specified in EditableCreatorProfileInput
  const [editUserMutation, { loading: editUserLoading, error: editUserError, data: editUserData }] =
    ApolloReact.useMutation<EditUserResponse, { editUserInput: EditableCreatorProfileInput }>(EDIT_USER);

  /**
   * editUser takes partial EditableCreatorProfileInput and returns the mutation result.
   * @param input EditableCreatorProfileInput
   */
  const editUser = async (input: EditableCreatorProfileInput) => {
    return editUserMutation({
      variables: {
        editUserInput: input,
      },
    });
  };

  return {
    user: userWithProfilePic,
    loading,
    error,
    refetch,
    editUser,
    editUserLoading,
    editUserError,
    editUserData,
  };
}
