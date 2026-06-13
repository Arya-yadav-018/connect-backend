import axios from "axios";
const backendurl = import.meta.env.VITE_BACKEND_URL;

export const fetchUser = async()=>{
     return await axios.get(
          `${backendurl}/api/profile/view`, {withCredentials: true}
     );
};