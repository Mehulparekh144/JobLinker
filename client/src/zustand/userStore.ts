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
    fetchUserData: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    userData: null,
    profileData : null,

    fetchUserData: async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user/profile');
            if (response.status !== 200) {
                throw new Error('Failed to fetch user data');
            }
            const userData: UserData = response.data;
            if(userData?.profile_id){
                const response = await axios.get("http://localhost:8000/api/user/skills/" +  userData.id)
                const profileData : ProfileData = response.data;
                set({ userData , profileData });
            }
            else{
                set({userData})
            }
        } catch (error) {
            console.error(error);
        }
    },
}));
