import Man from "./man.svg"
import "./PageNotFound.css"
import logo from "../../assets/svgs/Quality-Academy.svg"
import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <>
        <div className="overlay">

       <Link to="/"><img src={logo} alt="Quality Academy" className="go-back" /> </Link> 
        <div className="page-not-found">
            <h1>404 Page Not Found</h1>
            <img src={Man} />
        </div>
        </div>
        </>
    );
}


export default PageNotFound;