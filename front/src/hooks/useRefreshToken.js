import axios from "../api/axios";
import useAuth from './useAuth';


const useRefreshToken = () => {

  const {auth, setAuth } = useAuth();

  const refresh = async ()=>{

    const response = await axios.get("/refresh", {withCredentials: true});
    const accessToken = response?.data?.accessToken;
    const userId = response?.data?.userId;
    const roles = response?.data?.userRole;
    setAuth({ user: { id: userId, roles: roles }, accessToken });
    return response.data.accessToken;
  }

    return refresh;
}

export default useRefreshToken;