import QuizNav from "./QuizNav";
import "./User.css"

import Upload from "../assets/svgs/Questionnaire/upload.svg";
import Add from "../assets/svgs/Questionnaire/add.svg";

const User =() => {
 return(
    <>
    <QuizNav />

    {/* Create Quiz */}

    <div className="create-quiz">

        <h1 className="user-greet">Good Morning, User
        <span className="ask-user">What do you want to do today?</span></h1>


        <div className="create-upload">

            <div className="quiz-create">
            <div className="create-quiz-btn">
                <img src={Add} />
            </div>
            <p>Create a questionnaire</p>
            </div>
            
            <div className="quiz-create">
            <div className="upload-resources-btn">
                <img src={Upload} />
            </div>
            <p>Upload Resources</p>
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