import { useEffect, useState } from "react";
import axios from "axios";

const useValidRequest = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");    
    if (!token) {
      return {success: false, userData};
    }

    axios.get("http://localhost:3000/api/v1/me/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.data) {
        return {success: false, userData};
      } else {
        setUserData(res.data)
      }
    }).catch((err) => {
      console.log(err);
      return {success: false, userData};
    });
  }, []);
  return {success: true, userData};
};

export default useValidRequest;
