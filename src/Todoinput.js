import { nanoid } from "nanoid";
import React, { useId } from "react";
import uuid from "uuid";

const TodoInput = ({ todo, id, setTodo, addTodo, editTodo}) => {

  const newuuid=nanoid();
  
  return (
      <div className="input-wrapper">
        <input
          type="text"
          name="todo"
          id={nanoid()}
          checked={false}
          value={todo}
          placeholder="Create a new todo"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>
    );
  };
  
  
  export default TodoInput;
