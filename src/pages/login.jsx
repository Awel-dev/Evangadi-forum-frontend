
import { useRef } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email= emailRef.current.value;
        const password= passwordRef.current.value;
        if(!email || !password){
            alert("Please fill in all fields");
            return;
        }

        try {
           const {data} = await axiosInstance.post("/users/login", {
                email: email,
                password: password
            });
            alert("Login successful");
            localStorage.setItem("token", data.token);
            // console.log(data);
                navigate("/");
        } catch (error) {
             const message = error.response?.data?.msg;

    if (message === "user not found, please register") {
        alert("User not found, please register");
    } else if (message === "invalid credential") {
        alert("Incorrect password");
    } else {
        alert("Something went wrong");
    }
        }
    };

    
    return <section id="container">
         <div><Link to="/register">Don't have an account? Register here</Link></div>
         <br />
        <form id="login-form" onSubmit={handleSubmit}>
    
        <div>
            <span>Email:--</span>
            <input type="email" placeholder="email" ref={emailRef} />
        </div>
        <br />
        <div>
            <span>Password:--</span>
            <input type="password" placeholder="password" ref={passwordRef} />
        </div>
        <br />
        <button type="submit">Login</button>

       </form>
       
      
    </section>
}
export default Login;
