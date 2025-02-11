import "./Todo.css";
import { useState } from "react";
export default function Todo({ id, setFormData, toDoNote }) {
  const [title, setTitle] = useState("golna");
  function changeTitle(event) {
    setTitle(event.target.value);
  }
  function addNote() {
    setFormData((prev) => {
      return {
        id: id,
        visibility: true,
      };
    });
  }
  return (
    <div className="container">
        <div className="input-container">
      <input
        onChange={(event) => {
          changeTitle(event);
        }}
        type="text"
        placeholder="To do"
        value={title}
      />
      <button onClick={addNote}> +</button>
      </div>
      {toDoNote && toDoNote.html && id === toDoNote.id && (
        <div dangerouslySetInnerHTML={{ __html: toDoNote.html }} />
      )}
    </div>
  );
}
