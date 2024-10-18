import axios from "axios";
import { useEffect, useState } from "react";

const useFetchBalance = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, balance };
        }
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setBalance(response.data.balance);
        }).catch((err) => {
            console.log(err);
            return { success: false, balance }
        })}, [balance])
    return { success: true, balance }
};

export default useFetchBalance;