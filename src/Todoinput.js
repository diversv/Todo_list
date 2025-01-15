import React, { useRef, useEffect } from "react";

const TodoInput = React.memo(({ todo, setTodo, addTodo, editTodoId, updateTodo,setEditTodoId  }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field when mounted or edit mode is active
    }
  }, [editTodoId]); // Focus whenever editTodoId changes

  const handleInputChange = (e) => {
    setTodo(e.target.value); // Update todo state as the user types
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission behavior
      if (editTodoId) {
        updateTodo(editTodoId, todo); // Update the existing todo
        setEditTodoId(null); // Reset editTodoid
      } else {
        addTodo(); // Add a new todo
      }
      inputRef.current.focus(); // Refocus the input after adding/updating
    }
  };

  const handleButtonClick = () => {
    if (editTodoId) {
      updateTodo(editTodoId, todo);
      setEditTodoId(null); // Reset editTodoId
    } else {
      addTodo();
    }
    setTodo(""); // Clear the input field
    inputRef.current.focus(); // Refocus after adding/updating
  };

  return (
    <div className="input-wrapper">
      <input
        ref={inputRef} // Reference to the input field
        type="text"
        name="todo"
        value={todo} // Bind the value to the state
        placeholder={editTodoId ? "Edit todo..." : "Add a new todo"}
        onChange={(e) => setTodo(e.target.value)} // Handle input changes
        onKeyDown={handleKeyDown} // Allow Enter key for adding/updating
      />
      <button className="add-button" onClick={handleButtonClick}>
        {editTodoId ? "Update" : "Add"}
      </button>
    </div>
  );
});

export default TodoInput;
