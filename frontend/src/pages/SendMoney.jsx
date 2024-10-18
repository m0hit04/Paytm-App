import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import useValidRequest from "../hooks/useValidRequest";
import SendMoneyBox from "../components/SendMoneyBox";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import useFetchBalance from "../hooks/useFetchBalance";

export const SendMoney = () => {
  const isValidRequest = useValidRequest();
  const navigate = useNavigate();
  const fetchBalance = useFetchBalance();

  useEffect(() => {
    if (!isValidRequest.success) {
      navigate("/")
      return;
    }
    if (!fetchBalance.success) {
      navigate("/");
      return;
    }
  }, [isValidRequest, navigate, fetchBalance]);

  return <div>
    <Appbar />
    <div className="mx-8">
      <Balance value={fetchBalance.balance}/>
    </div>
    <SendMoneyBox />
  </div>
}