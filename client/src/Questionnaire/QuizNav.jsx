import { Link } from "react-router-dom";
import logo from "../assets/svgs/Quality-Academy.svg";


export default function QuizNav() {
    return (
       <>
         <div className="nav-container">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            
            <div className="user-profile">
                
            </div>
       </div>
       </>
    );
}