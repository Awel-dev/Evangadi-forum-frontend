import { useRef } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";

function Register(){
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
   
   async function handleSubmit(e) {
        e.preventDefault();

        const username= usernameRef.current.value;
        const firstName= firstNameRef.current.value;
        const lastName= lastNameRef.current.value;
        const email= emailRef.current.value;
        const password= passwordRef.current.value;

        if(!username || !firstName || !lastName || !email || !password){
            alert("Please fill in all fields");
            return;
        }

        try {
            await axiosInstance.post("/users/register", {
                userName: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
                alert("User registered successfully please login");
                navigate("/login");
        } catch (error) {
            alert("Error registering user");
            console.error(error.response);
        }
    }

    return <div>
        
       <form onSubmit={handleSubmit}>
     <div>
        <span>Username:--</span>
        <input type="text" placeholder="username" ref={usernameRef} />
     </div>
     <br />
     <div>
        <span>first name:--</span>
        <input type="text" placeholder="firstname" ref={firstNameRef} />
     </div>
        <br />
        <div>
            <span>last name:--</span>
            <input type="text" placeholder="lastname" ref={lastNameRef} />
        </div>
        <br />
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
        <button type="submit">Register</button>

       </form>
       <br />
       <Link to="/login">Already have an account? Login here</Link>

    </div>
}
export default Register;