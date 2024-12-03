import React, { useState } from "react";

const QuizForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [settings, setSettings] = useState(initialData.settings || { isPublic: true, timeLimit: 0, shuffleQuestions: false, allowMultipleAttempts: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, settings });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Public</label>
        <input type="checkbox" checked={settings.isPublic} onChange={(e) => setSettings({ ...settings, isPublic: e.target.checked })} />
      </div>
      {/* <div>
        <label>Time Limit (minutes)</label>
        <input type="number" value={settings.timeLimit} onChange={(e) => setSettings({ ...settings, timeLimit: Number(e.target.value) })} />
      </div> */}
      <div>
        <label>Shuffle Questions</label>
        <input type="checkbox" checked={settings.shuffleQuestions} onChange={(e) => setSettings({ ...settings, shuffleQuestions: e.target.checked })} />
      </div>
      <div>
        <label>Allow Multiple Attempts</label>
        <input type="checkbox" checked={settings.allowMultipleAttempts} onChange={(e) => setSettings({ ...settings, allowMultipleAttempts: e.target.checked })} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default QuizForm;
