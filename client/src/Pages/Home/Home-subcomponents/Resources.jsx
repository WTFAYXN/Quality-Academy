import "./Resources.css";
import line from "../../../assets/svgs/Line.svg";
import { Link } from "react-router-dom";
export default function Resources() {
    return(
        <>
        <div className="resources-bg">
            <div className="get-started">
                <p className="resources-text">Resources</p>
                <h1 className="resources-heading">Helpful Resources For all your
                Learning Needs<span> <img src={line} alt="" /></span></h1>
                <Link className="text-decoration-none" to="/resources">
                <button className="home-button resources-btn">Check Resources</button>
                
                </Link>
            </div>

        </div>
        </>
    )
}