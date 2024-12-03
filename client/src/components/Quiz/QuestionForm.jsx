import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question</label>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </div>
      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
        </select>
      </div>
      <div>
        <label>Options</label>
        {options.map((opt, index) => (
          <div key={index}>
            <input
              type="text"
              value={opt.optionText}
              onChange={(e) => handleOptionChange(index, "optionText", e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={opt.isCorrect}
                onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)}
              />
              Correct
            </label>
            <button type="button" onClick={() => handleRemoveOption(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
      </div>
      <div>
        <label>Points</label>
        <input type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
      </div>
      <button type="submit">Save Question</button>
    </form>
  );
};

export default QuestionForm;
