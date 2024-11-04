import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import SendMoneyBox from "../components/SendMoneyBox";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import axios from "axios"
import { BackToDashboardButton } from "../components/BackToDashboardButton";

export const SendMoney = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);

  function fetchBalance() {
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
  }
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

      fetchBalance();
  }, [navigate])

  return (
    (isAuthenticated) && <div>
    <Appbar />
    <div className="mx-8">
      <Balance value={balance}/>
    </div>
    <div className="bg-gray-100 pt-3">
      <BackToDashboardButton />
    </div>
    <SendMoneyBox fetchBalance={fetchBalance} />
  </div>
  )
  
}