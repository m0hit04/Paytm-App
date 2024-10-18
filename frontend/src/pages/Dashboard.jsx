import { useEffect, useState } from "react"
import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom"
import useValidRequest from "../hooks/useValidRequest"
import useFetchBalance from "../hooks/useFetchBalance"

// can apply lazy loading concept here
export const Dashboard = () => {
  const navigate = useNavigate();
  const isValidRequest = useValidRequest();
  const fetchBalance = useFetchBalance();

  useEffect(() => {
    if (!isValidRequest) {
      navigate("/");
      return false;
    }
    if (!fetchBalance.success) {
      navigate("/");
      return false;
    }
  }, [navigate, isValidRequest, fetchBalance])

  return <div>
    <Appbar />
    <div className="mx-8">
      <Balance value={fetchBalance.balance} />
      <Users />
    </div>
  </div>
}