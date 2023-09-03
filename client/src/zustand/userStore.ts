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

interface UserStore {
    userData: UserData | null;
    fetchUserData: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    userData: null,

    fetchUserData: async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user/profile');
            if (response.status !== 200) {
                throw new Error('Failed to fetch user data');
            }
            const userData: UserData = response.data;
            set({ userData });
        } catch (error) {
            console.error(error);
        }
    },
}));
