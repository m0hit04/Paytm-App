import { useEffect } from "react";
import axios from "axios";

const useValidRequest = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");    
    if (!token) {
      return false;
    }

    axios.get("http://localhost:3000/api/v1/me/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.data) {
        return false;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
  }, []);
  return true;
};

export default useValidRequest;
