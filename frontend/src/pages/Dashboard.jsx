import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        console.log(res);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(`User is not validated : ${err}`);
        setIsAuthenticated(false)
        navigate("/");
      })

    axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        console.log(res);
        setBalance(res.data.balance)
      })
      .catch(() => {
        console.log(`Can not fetch balance`);
      })
  }, [navigate])

  return  (
    (isAuthenticated ? (    
      <div>
        <Appbar />
        <div className="mx-8">
          <Balance value={balance} />
          <Users />
        </div>
      </div>
    ) : <p>Loading...</p> 
  )
)
  
}