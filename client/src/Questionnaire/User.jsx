import Nav from "../components/Navbar/Navbar";
import "./User.css"

import Upload from "../assets/svgs/Questionnaire/upload.svg";
import Add from "../assets/svgs/Questionnaire/add.svg";
import { Link } from "react-router-dom";

const User =() => {
 return(
    <>
    <Nav />

    {/* Create Quiz */}

    <div className="create-quiz">

        <h1 className="user-greet">Good Morning, User
        <span className="ask-user">What do you want to do today?</span></h1>


        <div className="create-upload">

                <Link className="quiz-create-link" to="/quizzes/create">
            <div className="quiz-create">
                <div className="create-quiz-btn">
                    <img src={Add} />
                </div>
                <p>Create a questionnaire</p>
            </div>
            </Link>
            
            <div className="quiz-create">
                <Link className="quiz-create-link" to="/resources">
                    <div className="upload-resources-btn">
                        <img src={Upload} />
                    </div>
                    <p>Upload Resources</p>
                </Link>
            </div>

    
        </div>

    </div>

     {/* Past Quiz */}

        <div className="past-quiz">

            <h1 className="user-greet">Past Questionnaires</h1>

            <div className="past-quiz-lists">

                <div className="past-quiz-list"></div>
                <div className="past-quiz-list"></div>
                <div className="past-quiz-list"></div>
                <div className="past-quiz-list"></div>
            </div>
        </div>

    </>
 )
}

export default User;