import React, { useState } from "react";
import Remove from "../../assets/svgs/Questionnaire/Remove.svg";

const QuestionForm = ({ initialData = {}, onSubmit }) => {
  const [question, setQuestion] = useState(initialData.question || "");
  const [type, setType] = useState(initialData.type || "single");
  const [options, setOptions] = useState(initialData.options || [{ optionText: "", isCorrect: false }]);
  const [points, setPoints] = useState(initialData.points || 1);

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { optionText: "", isCorrect: false }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ question, type, options, points });
  };

  return (
    <form className="question-form-main" onSubmit={handleSubmit}>
      <div className="question-form">

        <div className="row">
        <div className="col-8">
          <input className="title-question" placeholder="Untitled Question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>

          <div className="col-4 text-center">
            <select className="btn btn-secondary dropdown-toggle dropdown-questions" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="single">Single Choice</option>
              <option value="multiple">Multiple Choice</option>
            </select>
          </div>
        </div>


        <div class="row mt-2">
            <ul>
                {options.map((opt, index) => (
                <li className="d-flex mt-3" key={index}>
                  <div className="d-flex test-div">
                     <span className="isAnswer">
                        <input
                           type="checkbox"
                           checked={opt.isCorrect}
                           onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)}
                             />
                       </span>
                       <input
                       type="text"
                       className="option-outline"
                       style={{ border: "0px" }}
                       value={opt.optionText}
                       placeholder={`Option ${index + 1}`}
                       onChange={(e) => handleOptionChange(index, "optionText", e.target.value)}
                       />
                       <span className="remove-option">
                        <img src={Remove} onClick={() => handleRemoveOption(index)} alt="Remove" />
                      </span>
                       </div>
                       </li>
                    ))}
                </ul>
          <button className="add-option" type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div>

        <div className="set-marks-title mt-2">
        <span>Marks:</span>
          <input className="set-marks" type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
        </div>
      </div>
      <button type="submit">Save Question</button>
    </form>
  );
};

export default QuestionForm;
