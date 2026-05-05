
import {useContext} from "react";
import {AppContext} from "../AppContext"


function Home(){
    const {user}=useContext(AppContext)
    // console.log(user);
    
    return <div>
        <h1>Home</h1>
        <h3>{user?.userName}</h3>
    </div>
}
export default Home;