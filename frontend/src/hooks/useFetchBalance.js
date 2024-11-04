import { useEffect, useState } from "react";
import axios from "axios";

const useFetchBalance = () => {
    const [balance, setBalance] = useState(0);
    const [fetchSuccess, setSuccess] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setSuccess(false);
            return;
        } else {
            axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setBalance(response.data.balance);
            }).catch((err) => {
                console.log(err);
                setSuccess(false);
            })
        }
    }, []);

    return { fetchSuccess , balance }
};

export default useFetchBalance;