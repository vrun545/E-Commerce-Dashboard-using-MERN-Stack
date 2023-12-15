import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate("/");
        }
    });

    // Function for API Integration from Backend
    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }
        else{
            alert("Please Enter Correct Details");
        }
    }

    return (
        <>
            <div className="login">
                <h1>Login Page</h1>
                <input className="inputBox" type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input className="inputBox" type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button onClick={handleLogin} className="appButton" type="button">Login</button>
            </div>
        </>
    )
}

export default Login;