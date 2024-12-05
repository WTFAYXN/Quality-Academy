import React, { useState } from "react";
import line from "../../assets/svgs/Line.svg";
const QuizForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [settings, setSettings] = useState(initialData.settings || { isPublic: true, timeLimit: 0, shuffleQuestions: false, allowMultipleAttempts: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, settings });
  };

  return (
    <div class="quiz-create-form" onSubmit={handleSubmit}>
    <h1 class="quiz-setting-h1">Setup Your Questionnare <span><img className="line-quiz" src={line} /></span></h1>
    <form class="quiz-form">
      <div class="title">
        <label class="title-label">Title</label>
        <input placeholder="Give a suitable Title for Questionnaire" class="title-input"ype="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div class="description">
        <label class="description-label">Description</label>
        <textarea placeholder="Describe Your Questionnaire" class="description-input"value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div class="checkboxes">
        <div class="isPublic">
          <label class="isPublic-label">Public</label>
         <input type="checkbox" checked={settings.isPublic} onChange={(e) => setSettings({ ...settings, isPublic: e.target.checked })} />
       </div>
      <div class="shuffle">
          <label class="shuffle-label">Shuffle        Questions</label>
        <input type="checkbox" checked={settings.shuffleQuestions} onChange={(e) => setSettings({ ...settings, shuffleQuestions: e.target.checked })} />
      </div>
        <div class="attempts">
          <label class="attempts-label">Multiple Attempts</label>
          <input type="checkbox" checked={settings.allowMultipleAttempts} onChange={(e) => setSettings({ ...settings, allowMultipleAttempts: e.target.checked })} />
      </div>
  </div>
  
      
      <button class="btn-quiz-setting">Save</button>
    </form>
  </div>
  );
};

export default QuizForm;
