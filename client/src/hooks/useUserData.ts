import {useEffect , useState} from 'react'
import { useUserStore } from '../zustand/userStore'


const useUserData = () => {
    const { userData, fetchUserData } = useUserStore()
    const [isLoading , setIsLoading] = useState(true)

    useEffect(() => {
        fetchUserData().then(()=>{
            setIsLoading(false)
        })
        .catch(()=>{
            alert("Error while fetching data")
            setIsLoading(false)
        })
    }, [fetchUserData ])

    return {userData  ,isLoading}

}

export default useUserData;
