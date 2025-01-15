import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ list, toggleTodo, remove, editTodo }) => {
  if (!list.length) {
    return <p className="empty-list">No Todos Available</p>;
  }

  //console.log("TodoList items:", list); // Debugging
  return (
    <div className="todo-list">
      {list.map((item) => (
        <div className="todo-item" key={item.id}>
          <div className="todo-details">
            <input
              className="checkbox"
              type="checkbox"
              checked={item.isChecked}
              onChange={() => toggleTodo(item.id, item.userId)}
            />
            <span className={item.isChecked ? "todo-checked" : ""}>
              {item.text || "(Unnamed Todo)"} {/* Fallback for missing text */}
            </span>
          </div>
          <div className="todo-actions">
            <button
              className="edit-button"
              onClick={() => editTodo(item.id, item.text, item.userId)}
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
            <button
              className="delete-button"
              onClick={() => remove(item.id, item.userId)} // Pass userId explicitly
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
