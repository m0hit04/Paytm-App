import { useEffect, useState } from "react"
import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
  const [balance, setBalance] = useState("")
  useEffect( () => {
    async function fetchBalance() {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setBalance(response.data.balance)
    }
    fetchBalance();
  }, [])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}