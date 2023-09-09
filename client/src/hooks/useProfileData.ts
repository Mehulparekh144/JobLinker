import axios from "axios";
import useUserData from "./useUserData";
import { useEffect, useState } from 'react'


const useProfileData = () => {

    interface ProfileDataProps{
        id : number ,
        total_work_ex : string,
        recent_title : string,
        recent_company : string,
        resume : string,
        skills : Array<string>
    }

    const { userData , isLoading } = useUserData();
    const [profileData, setProfileData] = useState<ProfileDataProps | null>(null);

    useEffect(()=> {
        if(userData?.profile_id){
            axios.get("/user/skills/" + userData?.id).then((response)=>{
                setProfileData(response.data)
                return 
            }).catch((err)=>{
                console.log("Error while fetching data " + err);
                return
                
            })
        }
    },[userData?.profile_id])

    return {profileData }
    

}

export default useProfileData;

