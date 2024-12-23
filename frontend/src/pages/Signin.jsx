import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        console.log(res.data.msg);
        setIsAuthenticated(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(`User is not validated : ${err}`);
        setIsAuthenticated(false)
      })
  }, [navigate])

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox type="email" onChange={(e) => {
          setUsername(e.target.value)
        }} placeholder="email" label={"Email"} />
        <InputBox type="password" onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="password" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            if (!username || !password) {
              alert(`Please fill in all the fields`)
              return;
            }
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
              })
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            } catch(err) {
              alert(`User doesn't exists. Please try again`);
              console.log(err);
            }
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
      </div>
    </div>
  </div>
}