import {create} from 'zustand';
import axios from 'axios';

interface UserData {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    profile_id: number;
    role: string;
    avatar : string;
}

interface ProfileData {
    id: number,
    total_work_ex: string,
    recent_title: string,
    recent_company: string,
    resume: string,
    skills: Array<string>
}



interface UserStore {
    userData: UserData | null;
    profileData : ProfileData | null;
    applicationData : [] ;
    fetchUserData: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    userData: null,
    profileData : null,
    applicationData : [],

    fetchUserData: async () => {
        try {
            const response = await axios.get('/user/profile');
            if (response.status !== 200) {
                throw new Error('Failed to fetch user data');
            }
            const userData: UserData = response.data;

            const applicationResponse = await axios.get("/user/my-applications/" + userData?.id)
            const applicationData = applicationResponse.data

            if(userData?.profile_id){
                const response = await axios.get("/user/skills/" +  userData.id)
                const profileData : ProfileData = response.data;
                set({ userData , profileData , applicationData });
            }

            else{
                set({userData , applicationData})
            }
        } catch (error) {
            console.error(error);
        }
    },
}));
