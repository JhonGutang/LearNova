'use client'
import { navItems } from "@/constants/navigationItems"
import ProfilePreview from "@/src/features/profile/ProfilePreview"
import ProfileEdit from "@/src/features/profile/ProfileEdit"
import TeacherHomeLayout from "@/src/layout/TeacherHomeLayout"
import { useUser } from "@/src/features/profile/useUser"

const ProfilePage: React.FC = () => {
    const { user, loading, error, editUser, editUserLoading, editUserError, editUserData, refetch } = useUser();
    return (
        <TeacherHomeLayout navItems={navItems} pageTitle="Profile Information">
            <div className="flex gap-6 w-full items-center min-h-[60vh]">
                <div className="flex-[1_1_0%]">
                    <ProfilePreview
                        firstName={user?.firstName}
                        lastName={user?.lastName}
                        image={user?.profilePic}
                    />
                </div>
                <div className="flex-[2_1_0%]">
                    <ProfileEdit 
                        userData={user}
                        editUser={editUser}
                        editUserLoading={editUserLoading}
                        editUserError={editUserError}
                        editUserData={editUserData}
                        refetchUser={refetch}
                    />
                </div>
            </div>
        </TeacherHomeLayout>
    )
}

export default ProfilePage