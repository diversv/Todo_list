import React, { useRef, useEffect } from "react";

const TodoInput = ({ todo, setTodo, addTodo, editTodoId, updateTodo }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editTodoId && inputRef.current) {
      inputRef.current.focus(); // Focus on the input field when editing
    }
  }, [editTodoId]); // Runs when editTodoId changes

  const handleInputChange = (e) => {
    setTodo(e.target.value); // Update todo state as user types
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (editTodoId) {
        updateTodo(editTodoId, todo); // Pass id and text explicitly
      } else {
        addTodo(); // Add a new todo
      }
      e.preventDefault(); // Prevent form submission
    }
  };

  const handleButtonClick = () => {
    if (editTodoId) {
      updateTodo(editTodoId, todo);
    } else {
      addTodo();
    }
  };


  return (
    <div className="input-wrapper">
      <input
        ref={inputRef} // Reference to the input field
        type="text"
        name="todo"
        value={todo} // Bind input value to todo state
        placeholder={editTodoId ? "Edit todo..." : "Create a new todo"}
        onChange={handleInputChange} // Handle input changes
        onKeyDown={handleKeyPress} // Allow Enter key to add/update todo
      />
      <button className="add-button" onClick={handleButtonClick}>
        {editTodoId ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default TodoInput;
