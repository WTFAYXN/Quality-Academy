import "./Resources.css";
import line from "../../../assets/svgs/Line.svg";
export default function Resources() {
    return(
        <>
        <div className="resources-bg">
            <div className="get-started">
                <p className="resources-text">Resources</p>
                <h1 className="resources-heading">Helpful Resources For all your
                Learning Needs<span> <img src={line} alt="" /></span></h1>
                <button className="home-button resources-btn">Get Started</button>
            </div>

        </div>
        </>
    )
}