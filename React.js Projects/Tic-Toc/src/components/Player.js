import { useState } from "react";

export default function Player({ name, symbol, isActive, newWinnerName }) {
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  function editing() {
    setIsEditing((edit) => !edit);
    if (isEditing) {
      newWinnerName(symbol, newName);
    }
  }
  function onChangeHandler(event) {
    setNewName(event.target.value);
  }
  return (
    <li className={isActive && "active"}>
      <span className="players">
        {!isEditing ? (
          <span className="player-name"> {newName}</span>
        ) : (
          <input id="newName" value={newName} onChange={onChangeHandler} />
        )}

        <span className="player-symbol"> {symbol}</span>
      </span>
      <button onClick={editing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
