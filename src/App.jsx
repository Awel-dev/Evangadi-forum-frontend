import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import axios from "./axiosInstance";
import { AppContext } from "./AppContext";



function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  

  useEffect(() => {
    async function checkUser() {
    
    try {

      const {data}  = await axios.get("/users/check", {
        headers: { Authorization: "Bearer " + token },
      });
      
      // console.log(data);
      setUser(data);
    } catch (error) {
      console.error(error.response);
      navigate("/login");
    }
  }

  checkUser();
 
}, [token, navigate]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;