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
        if(userData){
            axios.get("/user/skills/" + userData?.id).then((response)=>{
                setProfileData(response.data)
            }).catch((err)=>{
                console.log("Error while fetching data " + err);
                
            })
        }
    },[userData])

    return {profileData}
    

}

export default useProfileData;

