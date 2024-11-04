import { useEffect, useState } from "react";
import axios from "axios";

const useValidRequest = () => {
  const [userData, setUserData] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");    
    if (!token) {
      console.log("Token not present");
      setSuccess(false);
      return;
    } else {
      axios.get("http://localhost:3000/api/v1/me/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
          setSuccess(true);
          console.log("True");
        } else {
          console.log("User data empty");
          setSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      });
    }
  }, []);

  // console.log({success, userData});
  
  return { success, userData };
};

export default useValidRequest;
