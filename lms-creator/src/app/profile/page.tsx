'use client'
import { navItems } from "@/constants/navigationItems"
import ProfilePreview from "@/src/features/profile/ProfilePreview"
import ProfileEdit from "@/src/features/profile/ProfileEdit"
import TeacherHomeLayout from "@/src/layout/TeacherHomeLayout"

const ProfilePage: React.FC = () => {
    return (
        <TeacherHomeLayout navItems={navItems} pageTitle="Profile Information">
            <div className="flex gap-6 w-full items-center min-h-[60vh]">
                <div className="flex-[1_1_0%]">
                    <ProfilePreview/>
                </div>
                <div className="flex-[2_1_0%]">
                    <ProfileEdit/>
                </div>
            </div>
        </TeacherHomeLayout>
    )
}

export default ProfilePage