import { useEffect, useState } from "react"
import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom"
import useValidRequest from "../hooks/useValidRequest"

// can apply lazy loading concept here
export const Dashboard = () => {
  const [balance, setBalance] = useState("")
  const navigate = useNavigate();
  const isValidRequest = useValidRequest();

  useEffect(() => {
    if (!isValidRequest) {
      navigate("/");
      return false;
    }

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };
    fetchBalance();
  }, [navigate, isValidRequest])

  return <div>
    <Appbar />
    <div className="m-8">
      <Balance value={balance} />
      <Users />
    </div>
  </div>
}